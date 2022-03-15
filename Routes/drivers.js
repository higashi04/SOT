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
    const chofer = await driver.find({})
    res.render('drivers/show', {chofer})
}));

router.post('/getDriver', isLoggedIn, catchAsync(async(req, res) => {
    let payload = req.body.payload.trim()
    let search = await driver.find({nombre: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search = search.slice(0, 10);
    res.send({payload: search})
}));
router.get('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    await driver.findById(req.params.id).populate({path: 'license'}).exec(
        (err, foundData) => {
            if(err) {
                console.log(err)
                req.flash('error', 'Se produjo un error')
                return res.redirect('/driver/show')
            }
            res.render('drivers/details', {chofer: foundData})
        })
}));

router.get('/show/:id/license', isLoggedIn, catchAsync(async(req, res) => {
    res.render('drivers/license')
}))


module.exports = router