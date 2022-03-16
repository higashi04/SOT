const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const Bus = require('../models/buses');
const driver = require('../models/drivers');
const license = require('../models/licenses');

router.get('/', isLoggedIn, (req, res) => {
    res.render('drivers/home')
});
router.get('/new', isLoggedIn, (req, res) => {
    res.render('drivers/new')
});
router.post('/new', isLoggedIn,catchAsync(async(req, res) =>{
    console.log(req.body)
    try{
        const chofer = new driver(req.body)
        await chofer.save()
        req.flash('success', 'Chofer guardado correctamente.')
        res.redirect('/driver/new')
    } catch(e) {
        req.flash('error', 'Se produjo un error al intentar el registro.')
        res.redirect('/driver/new')
    }
}));
router.get('/show',isLoggedIn, catchAsync(async(req, res) => {
    res.render('drivers/show')
}));

router.post('/getDriver', isLoggedIn, catchAsync(async(req, res) => {
    let payload = req.body.payload.trim()
    let search = await driver.find({nombre: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search = search.slice(0, 10);
    res.send({payload: search})
}));
router.get('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    await driver.findById(req.params.id).populate({path: 'bus'}).populate({path: 'license'}).exec(
       async (err, foundData) => {
            if(err) {
                console.log(err)
                req.flash('error', 'Se produjo un error')
                return res.redirect('/driver/show')
            }
            const buses = await Bus.find({})
            res.render('drivers/details', {chofer: foundData, buses})
        })
}));
router.put('/show/:id', isLoggedIn, catchAsync(async(req, res) =>{
    try{
        const {id} = req.params
        const addBus = await driver.findById(id)
        addBus.bus = req.body.unidad
        await addBus.save()
        req.flash('success', 'Se asigna unidad con éxito')
        res.redirect(`/driver/show/${id}`)
    } catch(e) {
        req.flash('error', 'Se produjo un error')
        console.log(e)
        res.redirect('/driver/show')
    }
}));
router.put('/show/:id/license', isLoggedIn, catchAsync(async(req, res) => {
    const chofer = await driver.findById(req.params.id)
    const newLicense = new license(req.body)
    await newLicense.save()
    chofer.license = newLicense
    await chofer.save()
    res.redirect(`/driver/show/${req.params.id}`)
}));
router.get('/show/:id/license/:id', isLoggedIn, catchAsync(async(req, res) => {
    const licenseShow = await license.findById(req.params.id)
    res.render('drivers/license', {licenseShow})
}));

module.exports = router