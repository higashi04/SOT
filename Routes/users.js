const express = require('express');
const passport = require('passport');
const async = require('async')
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const catchAsync = require('../AsyncErrors');
const User = require('../models/users');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/register', async(req, res) => {
    res.render('users/register')
});

router.post('/register', catchAsync(async(req, res)=>{
    try{
        const { email, username, password, firstName, lastName, puesto } = req.body;
        const user = new User({ email, username, firstName, lastName, puesto });
        const registerUser = await User.register(user, password);
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
})

///userProfiles///
router.get('/users', isLoggedIn,catchAsync(async(req, res) => {
       const users = await User.find({});
       res.render('users/user-page', {users});
}));
router.get('/users/:id', isLoggedIn,(req, res)=>{
    User.findById(req.params.id, (err, foundUser) =>{ 
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('users/show', {user: foundUser})
    })
});
router.get('/users/:id/edit', catchAsync(async(req,res)=>{
    const user = await user.findById(req.params.id)
    res.render('users/edit', {user})
  }));
router.put('/users/:id', isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, req.body)
    res.redirect(`/users/${user._id}`)
})
router.delete('/users/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const {id} = req.params;
    await User.findByIdAndDelete(id)
    req.flash('success', 'Usuario eliminado.')
    res.redirect('/')
}));

//forgot password//
router.get('/forgot', (req, res)=>{
    res.render('users/forgot')
});
router.post('/forgot', (req, res, next) =>{
    async.waterfall([
        (done)=>{
            crypto.randomBytes(20, (err, buf)=>{
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done)=>{
            User.findOne({ email: req.body.email}, (err, user)=>{
                if(!user){
                    req.flash('error', 'No hay cuenta asociada a ese email.');
                    return res.redirect('/forgot')
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save((err)=>{
                    done(err, token, user);
                });
            });
        },
        (token, user, done) =>{
            let smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            const mailOptions = {
                to: user.email,
                from: process.env.USER,
                subject: 'Reseteo de contraseña',
                text: 'Este mail se ha mandado porque usted, o alguien más ha solicitado resetear la contraseña de su cuenta. \n\n'+
                'Favor de hacer clic en el siguiente enlace, o copiar y pegarlo en la barra de direcciones de su navegador de Internet. \n\n'+
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'Si no solicitó este servicio, favor de ignorar este correo. \n'

            };
            smtpTransport.sendMail(mailOptions, (err)=>{
                req.flash('success', 'Se ha mandado un correo a la cuenta de email asociada.');
                done(err, 'done');
            });
        }
    ], (err) =>{
        if(err) return next(err);
        res.redirect('/forgot');
    });
});
router.get('/reset/:token', (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, (err, user) => {
        if(!user) {
            req.flash('error', 'El enlace es invalido, o ya expiró.');
            return res.redirect('/forgot');
        }
        res.render('users/new-pass', {token: req.params.token})
    })
});

router.post('/reset/:token', (req, res)=>{
    async.waterfall([
        done => {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, (err, user)=>{
                if (!user){
                    req.flash('error', 'El enlace es invalido, o ya expiró.');
                    return res.redirect('/forgot')
                }
                if(req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, (err)=>{
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.save(function(err){
                            req.redirect('/');
                        });
                    });
                } else {
                    req.flash('error', 'Las contraseñas no coinciden.');
                    return res.redirect(`/users/reset/${user.token}`);
                }
            });
        },
        function (user, done) {console.log('error 1?')
            const smtpTransport = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                    user: process.env.USER,
                    pass: proccess.env.PASS
                }
            });
            console.log(smtpTransport)
            const mailOptions = {
                to: user.mail,
                from: process.env.USER,
                subject: 'Su contraseña ha sido cambiada.',
                text: 'El objetivo de este correo es confirmar que el cambio de contraseña \n\n' +
                'para la cuenta asociada con el correo ' + user.email + ' ha sido cambiada con éxito.'
            };
            console.log('error 2?')
            smtpTransport.sendMail(mailOptions, (err)=>{
                req.flash('success', 'Su contraseña ha sido actualizada.');
                done(err);
            });
        }
    ], 
    (err) => {
        console.log('error 3?')
        res.redirect('/')
    })
})
//logout//
router.get('/logout', (req, res)=>{
    req.logout();
    delete req.session.returnTo
    req.flash('success', 'Sesión terminada con éxito.')
    res.redirect('/');
})
  
module.exports = router;