require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const helmet = require('helmet');
const ExpressError = require('./middleware/expressError');
//routes//
const userRoutes = require('./Routes/users');
const invRoutes = require('./Routes/inventory');
const mttoRoutes = require('./Routes/mantenimiento-y-almacen');
const hrRoutes = require('./Routes/admin-per');
const qaRoutes = require('./Routes/qa');
const comprRoutes = require('./Routes/compras');
const busesRoutes = require('./Routes/buses');
const driversRoutes = require('./Routes/drivers');
const driversAttendance = require('./Routes/driversAttendance');
const drivingRoutes = require('./Routes/driversRoutes');
const standardRoutesRoutes = require('./Routes/standardRoutes');
const ticketRoutes = require('./Routes/tickets');
const bajaRoutes = require('./Routes/bajas');
const altasRoutes = require('./Routes/altas');
const tallerRoutes = require('./Routes/taller');
const recepcionRoutes = require('./Routes/recepcion');
const recruitmentRoutes = require('./Routes/recruit');
const alcoholimetroRoutes = require('./Routes/alcoholimetro');
const dielselRoutes = require('./Routes/diesel');
const gafeteChoferRoutes = require('./Routes/gafetes');
const logrosRoutes = require('./Routes/logros');
const discplinaRoutes = require('./Routes/disciplina');
const messageRoutes = require('./Routes/messaging');
//models//
const Users = require('./models/users')
/////////
const app = express();
const path= require('path');
const MongoStore = require('connect-mongo');
const dbUrl =  process.env.DB_URL
const secret = process.env.SECRET
/////////////// 
//ejsStuff//
app.engine('ejs',engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
app.use(
    helmet.contentSecurityPolicy({
    directives: {
        // defaultSrc: [],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["blob:"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "https://res.cloudinary.com/transportes-villarreal/"
            ]
        }
    })
);
//cookies//

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600,
    crypto: {
        secret: secret,
    }
});

store.on('error', (e)=>{
    console.log(e)
})

const sessionConfig = {
    store: store,
    name: 'makalaniaTemple',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60*24,
        maxAge: 1000 * 60 * 60*24
    }
}
app.use(session(sessionConfig));
app.use(flash());

//passport//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser()); //store user in session
passport.deserializeUser(Users.deserializeUser());//remove user from session

app.use((req, res, next) =>{
    if(!['/login','/logout','/register', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.originalUrl = req.originalUrl
    next();
});
//'mongodb://localhost:27017/trasn-vill'
//mongoStuff//
if (process.env.NODE_ENV !== "production") {
    mongoose.connect('mongodb://localhost:27017/trasn-vill')
    console.log('local db')
} else {
    mongoose.connect(dbUrl)
    console.log('mongo atlas')
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', ()=> {
    console.log('Database is operational')
})
///Routes///
app.use('/', userRoutes);
app.use('/inv', invRoutes);
app.use('/mtto', mttoRoutes);
app.use('/hr', hrRoutes);
app.use('/qa', qaRoutes);
app.use('/compras', comprRoutes);
app.use('/buses', busesRoutes);
app.use('/driver', driversRoutes);
app.use('/driverAttendance', driversAttendance);
app.use('/driving', drivingRoutes);
app.use('/routes', standardRoutesRoutes);
app.use('/tickets', ticketRoutes);
app.use('/bajas', bajaRoutes);
app.use('/altas', altasRoutes);
app.use('/taller', tallerRoutes);
app.use('/reception', recepcionRoutes);
app.use('/reclutamiento', recruitmentRoutes);
app.use('/alcoholimetro', alcoholimetroRoutes);
app.use('/diesel', dielselRoutes);
app.use('/gafete', gafeteChoferRoutes);
app.use('/logros', logrosRoutes);
app.use('/disc', discplinaRoutes);
app.use('/inbox', messageRoutes);
/////
app.get('/error', (req, res)=>{
    res.render('home/error')
})
// '/' homepage
app.get('/', (req, res) => {
    res.render('home/home')
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Error 404: El sitio no existe.', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Se ha producido un error.'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
});