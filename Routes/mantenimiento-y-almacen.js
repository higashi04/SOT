const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const nodemailer = require('nodemailer')
//models
const mtto = require('../models/mantenimiento');
const bus = require('../models/buses');
const Inv = require('../models/inventory');
const User = require('../models/users');
const Refactions = require('../models/refactions');

const mail = async(headers, data) => {
    const almacenista = await User.findOne({puesto: 'Ejecutivo de Almacen y Diesel'})
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
          mailOptions = {
            to: almacenista.email,
            from: process.env.USER,
            subject: 'Nuevo Vale de Refacciones.',
            text: 'Ha recibido este correo ya que se ha generado un nuevo vale de refacciones.\n\n' +
              'Favor de surtir el material siguiente:\n\n' +
              'http://' + headers +'/mtto/repairs/show/' + data +'\n\n' +
              'Un cordial saludo.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            req.flash('success', 'Se ha enviado un correo a ' + almacenista.email + ' .');
            done(err, 'done');
          });
}

router.get('/', isLoggedIn, (req, res) =>{
    res.render('mantenimiento-y-almacen/home')
});
router.get('/repairs', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Ejecutivo de Mantenimiento y Almacen' || req.user.isAdmin) {
    const buses = await bus.find({})
    res.render('mantenimiento-y-almacen/refacciones', {buses})
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/mtto')
    } 
}));

router.post('/repairs', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Ejecutivo de Mantenimiento y Almacen' || req.user.isAdmin) {
    try {
        const unit = await bus.findById(req.body.unidad)
        const refaction = new Refactions(req.body)
        refaction.unit = unit
        await refaction.save()
        req.flash('success', 'El vale fue generado éxitosamente.')
        res.redirect('/mtto')
        mail(req.headers.host,refaction._id)
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        console.log(e)
        res.redirect('/mtto')
    } } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/mtto')
    } 
}));
router.get('/repairs/show', isLoggedIn, catchAsync(async(req, res) =>{
    const refactions = await Refactions.find({})
    res.render('mantenimiento-y-almacen/show', {refactions})
}))
router.get('/repairs/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    await Refactions.findById(req.params.id).populate({path: 'unit'}).exec((err, foundTicket) => {
        if(err){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/mtto')
        }
        res.render('mantenimiento-y-almacen/refacion-show', {ticket: foundTicket})
    })
}))

router.get('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    await mtto.findById(req.params.id).populate({path: 'unit'}).exec((err, foundMtto) => {
        if (err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/')
        }
        res.render('mantenimiento-y-almacen/detail', {orden: foundMtto})
    })
}));

router.put('/:id', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const mant = await mtto.findById(req.params.id)
        mant.status = req.body.status == 'true' ? true : false
        mant.completeDateRegister = Date.now()
        mant.save()
        req.flash('success', 'El cambio fue registrado correctamente.')
        res.redirect(`/mtto/${mant._id}`);
    } catch(e){
        req.flash('error', 'Se produjo un error')
        res.redirect('/mtto')
        console.log(e.message)
    }
}));

module.exports = router