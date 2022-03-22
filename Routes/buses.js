const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models
const Bus = require('../models/buses');
const chofer = require('../models/drivers')
const mtto = require('../models/mantenimiento');
const unitChecklist = require('../models/unitChecklist');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('buses/home')
});

router.get('/new', isLoggedIn,(req, res) => {
    res.render('buses/new')
});

router.post('/new', isLoggedIn,catchAsync(async(req, res) => {
    try{
        const bus = new Bus(req.body)
        await bus.save()
        req.flash('success', 'Unidad registrada correctamente.')
        res.redirect('/buses')
    } catch (e) {
        req.flash('error', 'Se produjo un error al intentar el registro.')
        res.redirect('/buses')
        console.log(e.message)
    }
}));

router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const bus = await Bus.find({})
    res.render('buses/show', {bus})
}));

router.get('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    await Bus.findById(req.params.id).populate({path: 'mantenimiento'}).exec(function(err, foundBus) {
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('buses/busDetails', {bus: foundBus})
    })
}));

router.put('/show/:id/mtto', isLoggedIn, catchAsync(async(req, res)=>{
    console.log('the route is being hit')
    try{
        const unit = await Bus.findById(req.params.id)
        const mant = new mtto(req.body)
        await mant.save()
        unit.mantenimiento.push(mant)
        unit.save()
        req.flash('success', 'Se registra correctamente el mantenimiento a la unidad.')
        res.redirect(`/buses/show/${unit._id}`);
    }catch(e){
        req.flash('error', 'Se produjo un error al intentar el registro.')
        res.redirect(`buses/show`)
    }
}));
router.get('/audit', isLoggedIn, catchAsync(async(req, res) =>{
    const choferes = await chofer.find({})
    const units = await Bus.find({})
    res.render('buses/audit', {choferes, units})
}));
router.post('/audit', isLoggedIn, catchAsync(async(req, res) =>{
    try{
        const audit = new unitChecklist(req.body)
        audit.save()
        req.flash('success', 'Se graba la auditoria correctamente.')
        res.redirect('/buses')
    } catch(e) {
        req.flash('error', 'Se produjo un error al intentar el registro.')
        res.redirect('/buses')
    }
}))
module.exports = router