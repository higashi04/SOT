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
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(helmet());
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
        //secure: true,
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

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("app running on port 3000")
});