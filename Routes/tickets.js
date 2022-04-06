const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const ticketSchema = require('../models/ticketSchema');
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
    const admin = await User.findOne({isAdmin: true})
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

const mailSolution = async(headers, data, ticket, userMail) => {
    const user = await User.findById(userMail)
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
          mailOptions = {
            to: user.email,
            from: process.env.USER,
            subject: `Actualización de Ticket num ${ticket}.`,
            text: 'Ha recibido este correo ya que su ticket ha sido actualizado.\n\n' +
              'Favor de revisarlo:\n\n' +
              'http://' + headers +'/tickets/show/' + data +'\n\n' +
              'Un cordial saludo.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            done(err, 'done');
          });
}

router.get('/', isLoggedIn, (req, res) => {
    res.render('tickets/home')
});
router.get('/new', isLoggedIn, (req, res) => {
    res.render('tickets/new')
});
router.post('/new', isLoggedIn, catchAsync(async(req, res) =>{
    console.log(req.body)
    const newTicket = new ticketSchema(req.body)
    newTicket.user = req.user._id
    newTicket.serial = serial()
    await newTicket.save()
    mail(req.headers.host, newTicket._id, req.user.username, newTicket.serial)
    req.flash('success', `Se genera el ticket ${newTicket.serial}. Guarde este número para su seguimiento.`)
    res.redirect('/tickets')
}));
router.get('/show', isLoggedIn, catchAsync(async(req,res) => {
    if (req.user.isAdmin) {
        const tickets = await ticketSchema.find().exec()
        res.render('tickets/show', {tickets})
    } else {
        const tickets = await ticketSchema.find({user: req.user._id}).exec()
        res.render('tickets/show', {tickets})
    }
}));
router.get('/show/:id', isLoggedIn, catchAsync(async(req,res) =>{
    await ticketSchema.findById(req.params.id).populate({path: 'user'}).exec((err, ticket) =>{
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/ticket');
        }
        res.render('tickets/details', {ticket})
    })
}));
router.put('/show/:id', isLoggedIn, catchAsync(async(req, res) =>{
    try{
        const ticket = await ticketSchema.findById(req.params.id)
        ticket.isSolved = req.body.isSolved === 'true' ? true : false
        if(ticket.isSolved === true) {
            ticket.solvedDate = Date.now()
        }
        ticket.sysAdminComments.push(req.body.sysAdminComments)
        await ticket.save()
        mailSolution(req.headers.host, ticket._id, ticket.serial, ticket.user)
        req.flash('success', `Se actualiza el contenido del ticket ${ticket.serial}`)
        res.redirect(`/tickets/show/${ticket._id}`)
    } catch(e) {
        console.log(e)
        req.flash('error', 'Se produjo un error.')
        res.redirect('/tickets')
    }
}))
module.exports = router