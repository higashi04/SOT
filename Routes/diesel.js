const express = require('express')
const router = express.Router()
const catchAsync = require('../AsyncErrors');
const isLoggedIn = require('../middleware/isLoggedin');
const dieselSchema = require('../models/diesel');
const busSchema = require('../models/buses');

router.get('/', isLoggedIn, (req, res) => {
    res.render('diesel/home')
})

router.get('/new', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Ejecutivo de Almacen y Diesel' || req.user.isAdmin) {
        try {
            const buses = await busSchema.find({}).exec()
            res.render('diesel/new', {buses})
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/diesel')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/diesel')
    }
}));

router.post('/new', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Ejecutivo de Almacen y Diesel' || req.user.isAdmin) {
        try {
            const newDiesel = new dieselSchema(req.body)
            await newDiesel.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/diesel')
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/diesel')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/diesel')
    }
}))
module.exports = router