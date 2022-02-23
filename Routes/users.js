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
        delete req.session.returnTo
    } else if(!req.session.returnTo) {
        res.redirect('/')
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
    const user = await User.findById(req.params.id)
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

router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No hay cuenta asociada a ese correo.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'chigashi.tvillarreal@gmail.com',
            pass: 'Trivium04!'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'chigashi.tvillarreal@gmail.com',
          subject: 'Reseto de contraseña.',
          text: 'Ha recibido este correo, ya que usted (o alguien más) solicitó resetear su contraseña.\n\n' +
            'Favor de dar clic, o copiar el siguiente enlace en su barra de direcciones en su navegador:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'Si no solicitó este cambio, ignore este correo. Su cuenta no sufrirá cambios.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          req.flash('success', 'Se ha enviado un correo a ' + user.email + ' .');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
  
  router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'El enlace no es valido, o ya ha expirado.');
        return res.redirect('/forgot');
      }
      res.render('users/new-pass', {token: req.params.token});
    });
  });
  
  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'El enlace no es valido, o ya ha expirado.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
              req.flash("error", "Las contraseñas no coinciden.");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'chigashi.tvillarreal@gmail.com',
            pass: 'Trivium04!'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'chigashi.tvillarreal@gmail.com',
          subject: 'Su contraseña ha sido cambiada.',
          text: 'Buen día,\n\n' +
            'Se confirma el cambio de contraseña para la cuenta asociada al correo ' + user.email + '\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Su contraseña ha sido actualizada correctamente.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });
  
//logout//
router.get('/logout', (req, res)=>{
    req.logout();
    delete req.session.returnTo
    req.flash('success', 'Sesión terminada con éxito.')
    res.redirect('/');
})
  
module.exports = router;