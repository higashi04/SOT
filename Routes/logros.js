const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const logrosSchema = require('../models/logrosSchema');
const drivers = require('../models/drivers');

router.get('/', isLoggedIn, (req, res) => {
    res.render('logros/home')
})

router.get('/show/oes', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'OES'
    const lists = await logrosSchema.find({company: company}).exec()
    res.render('logros/show', {company, lists})
}))
router.get('/show/bpi', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'BPI'
    const lists = await logrosSchema.find({company: company}).exec()
    res.render('logros/show', {company, lists})
}))
router.get('/show/medline', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'Medline'
    const lists = await logrosSchema.find({company: company}).exec()
    res.render('logros/show', {company, lists})
}))
router.get('/show/aistermi', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'AISTERMI'
    const lists = await logrosSchema.find({company: company}).exec()
    res.render('logros/show', {company, lists})
}))
router.get('/new/oes', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'OES'
    const choferes = await drivers.find({company: company}).populate({path: 'bus'}).exec()
    res.render('logros/new', {company, choferes})
}))
router.get('/new/bpi', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'BPI'
    const choferes = await drivers.find({company: company}).populate({path: 'bus'}).exec()
    res.render('logros/new', {company, choferes})
}))
router.get('/new/medline', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'Medline'
    const choferes = await drivers.find({company: company.toUpperCase()}).populate({path: 'bus'}).exec()
    res.render('logros/new', {company, choferes})
}))
router.get('/new/aistermi', isLoggedIn, catchAsync(async(req, res) => {
    const company = 'AISTERMI'
    const choferes = await drivers.find({company: company}).populate({path: 'bus'}).exec()
    res.render('logros/new', {company, choferes})
}))
router.post('/new/oes', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const company = 'OES'
            const newReg = new logrosSchema(req.body)
            newReg.company = company
            await newReg.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect(`/logros/show/${company}`)
       } catch(e) {
           req.flash('error', 'Se produce un error.')
           res.redirect('/logros')
       }
    
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/logros')
    }
}))
router.post('/new/bpi', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try {
            const company = 'BPI'
            const newReg = new logrosSchema(req.body)
            newReg.company = company
            await newReg.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect(`/logros/show/${company}`)
        } catch(e) {
            req.flash('error', 'Se produce un error.')
            res.redirect('/logros')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/logros')
    }
}))
router.post('/new/medline', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try {
            const company = 'Medline'
            const newReg = new logrosSchema(req.body)
            newReg.company = company
            await newReg.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect(`/logros/show/${company}`)
        } catch(e) {
            req.flash('error', 'Se produce un error.')
            res.redirect('/logros')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/logros')
    }
}))
router.post('/new/aistermi', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try {
            const company = 'AISTERMI'
            const newReg = new logrosSchema(req.body)
            newReg.company = company
            await newReg.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect(`/logros/show/${company}`)
        } catch(e) {
            req.flash('error', 'Se produce un error.')
            res.redirect('/logros')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/logros')
    }
}))

module.exports = router