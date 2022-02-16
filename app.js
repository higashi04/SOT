require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override')
//routes//
const userRoutes = require('./Routes/users');
const invRoutes = require('./Routes/inventory');
const mttoRoutes = require('./Routes/mantenimiento-y-almacen');
const hrRoutes = require('./Routes/admin-per');
const qaRoutes = require('./Routes/qa');
const comprRoutes = require('./Routes/compras');
//models//
const Users = require('./models/users')
/////////
const app = express();
const path= require('path');
/////////////// 
//ejsStuff//
app.engine('ejs',engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'))
//cookies//
const sessionConfig = {
    secret: 'secretToKeep',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
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

//mongoStuff//
mongoose.connect('mongodb://localhost:27017/trasn-vill')
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
/////
app.get('/error', (req, res)=>{
    res.render('home/error')
})
// '/' homepage
app.get('/', (req, res) => {
    res.render('home/home')
})

app.listen(3000, ()=>{
    console.log("app running on port 3000")
});