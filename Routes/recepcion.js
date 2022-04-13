const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const logSchema = require('../models/bitacora');
const unhireable = require('../models/unhireable');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('reception/home')
});
router.get('/log', isLoggedIn, catchAsync(async(req,res) => {
    const logs = await logSchema.find({}).exec()
    res.render('reception/log', {logs})
}));
router.post('/log', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        try{
            const newLog = new logSchema()
            await newLog.save()
            req.flash('success', 'Se crea un listado nuevo.')
            res.redirect('/reception/log')
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/reception/log')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reception/log')
    }
}));
router.get('/log/:id', isLoggedIn, catchAsync(async(req, res) => {
    const log = await logSchema.findById(req.params.id)
    res.render('reception/log-details', {log})
}));
router.put('/log/:id', isLoggedIn, catchAsync(async(req,res)=>{
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        try{
            const log = await logSchema.findById(req.params.id)
            const {time, visitor, message, transfered, ar} = req.body
            if (time.length > 1) {
                time.forEach(element => {
                    log.time.push(element)
                });
                visitor.forEach(element => {
                    log.visitor.push(element)
                })
                message.forEach(element => {
                    log.message.push(element)
                })
                transfered.forEach(element => {
                    log.transfered.push(element)
                })
                ar.forEach(element => {
                    log.ar.push(element)
                })
            } else {
                log.time.push(time)
                log.visitor.push(visitor)
                log.message.push(message)
                log.transfered.push(transfered)
                log.ar.push(ar)
            }
            await log.save()
            req.flash('success', 'Se ha guardado el registro correctamente.')
            res.redirect(`/reception/log/${log._id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/reception/log')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reception/log')
    }
}))

router.get('/irrecontratables', isLoggedIn, catchAsync(async(req, res) => {
    const unhireLists = await unhireable.find({}).exec()
    res.render('unhire/home', {unhireLists})
}));
router.get('/irrecontratables/new', isLoggedIn, (req, res) => {
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        res.render('unhire/new')
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reception/irrecontratables')
    }
});
router.post('/irrecontratables/new', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        try{
            const newUnhire = new unhireable(req.body)
            await newUnhire.save()
            req.flash('success', 'El nuevo registro ha sido guardado correctamente.')
            res.redirect('/reception/irrecontratables')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/reception/irrecontratables')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reception/irrecontratables')
    }
}))
module.exports = router