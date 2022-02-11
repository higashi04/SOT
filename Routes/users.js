const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../AsyncErrors');
const Users = require('../models/users');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/register', async(req, res) => {
    res.render('users/register')
});

router.post('/register', catchAsync(async(req, res)=>{
    try{
        const { email, username, password } = req.body;
        const user = new Users({ email, username });
        const registerUser = await Users.register(user, password);
        req.flash('success', 'éxito')
        res.redirect('/register')
    }catch(e){
        req.flash('error', 'Se produjo un problema al registrar al usuario')
        res.redirect('/register')
   }
}));

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Bienvenido.');
    if (req.session.returnTo) {
        res.redirect(req.session.returnTo)
    } else {
        res.redirect('/')
    }
    delete req.session.returnTo
})

///userProfiles///
router.get('/users', isLoggedIn,catchAsync(async(req, res) => {
       const users = await Users.find({});
       res.render('users/user-page', {users});
}));
router.get('/users/:id', isLoggedIn,(req, res)=>{
    Users.findById(req.params.id, (err, foundUser) =>{ 
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('users/show', {user: foundUser})
    })
});
router.get('/users/:id/edit', catchAsync(async(req,res)=>{
    const user = await Users.findById(req.params.id)
    res.render('users/edit', {user})
  }));
router.put('/users/:id', isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    const user = await Users.findByIdAndUpdate(id, req.body)
    res.redirect(`/users/${user._id}`)
})
router.delete('/users/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const {id} = req.params;
    await Users.findByIdAndDelete(id)
    req.flash('success', 'Usuario eliminado.')
    res.redirect('/')
}));
router.get('/logout', (req, res)=>{
    req.logout();
    delete req.session.returnTo
    req.flash('success', 'Sesión terminada con éxito.')
    res.redirect('/');
})
  
module.exports = router;