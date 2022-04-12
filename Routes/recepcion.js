const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const logSchema = require('../models/bitacora');

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
            await log.save()
            req.flash('success', 'Se ha guardado el registro correctamente.')
            res.redirect(`/reception/log/${log._id}`)
        } catch(e) {
            console.log(e)
            req.flash('error', 'Se produjo un error.')
            res.redirect('/reception/log')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reception/log')
    }
}))
module.exports = router