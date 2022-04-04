const express = require('express');
const router = express.Router();
const routes = require('../models/standardRoutes');
const buses = require('../models/buses');
const drivers = require('../models/drivers');
const isLoggedin = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

router.get('/', isLoggedin, (req, res) =>{
    res.render('standardRoutes/home')
})

router.get('/new', isLoggedin, catchAsync(async(req, res) =>{
    if (req.user.puesto === 'Auxiliar de Operaciones' || req.user.isAdmin) {
        const choferes = await drivers.find({}).populate({path: 'bus'}).exec()
        res.render('standardRoutes/new', {choferes})
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/routes')
    }
}))

router.post('/new', isLoggedin, catchAsync(async(req, res) =>{
    if (req.user.puesto === 'Auxiliar de Operaciones' || req.user.isAdmin) {
        try{
            const newRoute = new routes(req.body)
            await newRoute.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/routes')
        } catch(e){
            console.log(e)
            req.flash('error', 'Se produjo un error.')
            res.redirect('/routes')
        }
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/routes')
    }
}));
router.get('/show', isLoggedin, (req, res) => {
    res.render('standardRoutes/show')
})

router.post('/getReg', isLoggedin, catchAsync(async(req, res) => {
    let payload = req.body.payload.trim()
    let search = await routes.find({company: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search = search.slice(0, 10);
    res.send({payload: search})
}));

router.get('/show/:id', isLoggedin, catchAsync(async(req, res) => {
    await routes.findById(req.params.id).populate({path: 'driver'}).exec((err, foundRoute) =>{
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/routes')
        }
        res.render('standardRoutes/details', {route: foundRoute})
    })
}))
module.exports = router
