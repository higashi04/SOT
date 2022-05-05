const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const isLoggedIn = require('../middleware/isLoggedin');
const bajasSchema = require('../models/bajasSchema');
const catchAsync = require('../AsyncErrors');
const ticketsSchema = require('../models/ticketSchema');
const User = require('../models/users');

const serialMaker = () => {
    let prefix = ''
    var seq = 0
    return {
        set_prefix: p =>{
            prefix = String(p)
        },
        set_seq: s =>{
            seq = s + Math.floor(Math.random() * 999)
        },
        gensym: () => {
            const result = prefix + seq
            return result
        }
    }
}
const serial = () => {
    const seqer = serialMaker()
    seqer.set_prefix('issue')
    seqer.set_seq(1000);
    const unique = seqer.gensym();
    return unique
}

const mail = async(headers, data, user, ticket) => {
    const admin = await User.findOne({puesto: 'Programador'})
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
          mailOptions = {
            to: admin.email,
            from: process.env.USER,
            subject: `Creación de Ticket num ${ticket}.`,
            text: 'Ha recibido este correo ya que '+ user + ' ha generado un nuevo ticket.\n\n' +
              'Favor de atender:\n\n' +
              'http://' + headers +'/tickets/show/' + data +'\n\n' +
              'Un cordial saludo.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            done(err, 'done');
          });
}

const newTicket = async(user, headers) =>{
    const createTicket = new ticketsSchema()
    createTicket.user = user._id
    createTicket.issueTitle = 'Registrar baja de usuario'
    createTicket.userComments = `Dar seguimiento a la baja del perfil correspondiente, si aplica, en ${headers}/bajas/show`
    createTicket.severity = 'medio'
    createTicket.serial = serial()
    await createTicket.save()
    mail(headers, createTicket._id, user.username, createTicket.serial)
}


router.get('/', isLoggedIn, (req, res) =>{
    res.render('bajas/home')
})
router.get('/new', isLoggedIn, (req, res)=>{
    if(req.user.puesto === 'Analista de Procesos' || req.user.isAdmin) {
        res.render('bajas/new');
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/bajas');
    }
})
router.post('/new', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Analista de Procesos' || req.user.isAdmin) {
        try{
            const newBaja = new bajasSchema(req.body)
            newBaja.save()
            newTicket(req.user, req.headers.host)
            req.flash('success', 'Registro guardado correctamente.')
            res.redirect('/bajas/new')
        }catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/bajas/new')
        }
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/bajas/new')
    }
}));

router.get('/show', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const bajas = await bajasSchema.find({}).exec()
        res.render('bajas/show', {bajas})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/bajas')
    }
}));
module.exports = router;