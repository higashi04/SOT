const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const Bus = require('../models/buses');
const driver = require('../models/drivers');
const license = require('../models/licenses');
const checklist = require('../models/checklist');
const drivingTest = require('../models/drivingTest');
const driverAudit = require('../models/driverAudit');

router.get('/', isLoggedIn, (req, res) => {
    res.render('drivers/home')
});
router.get('/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const buses = await Bus.find({})
            res.render('drivers/new', {buses})
        }catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/driver')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver')
    }

}));
router.post('/new', isLoggedIn,catchAsync(async(req, res) =>{
    try{
        const chofer = new driver(req.body)
        chofer.bus = req.body.bus
        await chofer.save()
        const unit = await Bus.findById(req.body.bus)
        unit.chofer = chofer._id
        unit.save()
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
    let search = await driver.find({name: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search = search.slice(0, 10);
    res.send({payload: search})
}));
router.get('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    await driver.findById(req.params.id).populate({path: 'audits'}).populate({path: 'bus'}).populate({path: 'license'}).exec(
       async (err, foundData) => {
            if(err) {
                console.log(err)
                req.flash('error', 'Se produjo un error')
                return res.redirect('/driver/show')
            }
            res.render('drivers/details', {chofer: foundData})
        })
}));
router.get('/edit/:id', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin || req.user.puesto === 'Analista de Procesos') {
        try{
            const chofer = await driver.findById(req.params.id).populate({path: 'bus'}).exec()
            const buses = await Bus.find({})
            res.render('drivers/edit', {chofer, buses})
        }  catch(e) {
            req.flash('error', 'Se produjo un error')
            console.log(e)
            res.redirect('/driver/')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/')
    }

}))
router.put('/edit/:id', isLoggedIn, catchAsync(async(req, res) =>{
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin || req.user.puesto === 'Analista de Procesos') {
        try{
            const {id} = req.params
            const editedDriver = await driver.findByIdAndUpdate(id, req.body)
            await editedDriver.save()
            req.flash('success', 'Se guardan los cambios correctamente.')
            res.redirect(`/driver/show/${id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error')
            res.redirect('/driver/show')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/show')
    }
}));
router.put('/show/:id/license', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try {
            const chofer = await driver.findById(req.params.id)
            const newLicense = new license(req.body)
            newLicense.driver = chofer
            await newLicense.save()
            chofer.license = newLicense
            await chofer.save()
            res.redirect(`/driver/show/${req.params.id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error')
            console.log(e)
            res.redirect('/driver/show')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/show')
    } 
}));
router.put('/show/:id/baja', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const chofer = await driver.findById(req.params.id)
            chofer.fueDadoDeBaja = req.body.fueDadoDeBaja === 'true' ? true : false
            chofer.baja = Date.now()
            await chofer.save()
            res.redirect(`/driver/show/${chofer._id}`)
        }catch {
            req.flash('error', 'Se produjo un error')
            console.log(e)
            res.redirect('/driver/show')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/show')
    }
}))
router.get('/show/license/:id', isLoggedIn, catchAsync(async(req, res) => {
    const licenseShow = await license.findById(req.params.id)
    res.render('drivers/license', {licenseShow})
}));
router.put('/show/license/:id', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const updateLicense = await license.findById(req.params.id)
            updateLicense.licenseType = req.body.licenseType
            updateLicense.number = req.body.number
            updateLicense.startDate = req.body.startDate
            updateLicense.expirationDate = req.body.expirationDate
            await updateLicense.save()
            req.flash('success', 'Se actualiza la licencia de conducir éxitosamente')
            res.redirect(`/driver/show/license/${updateLicense._id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error')
            console.log(e)
            res.redirect('/driver/show')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/show')
    } 
}));
router.get('/show/:id/checklist', isLoggedIn, catchAsync(async(req, res) => {
    const chofer = await driver.findById(req.params.id)
    res.render('drivers/checklist', {chofer})
}));
router.put('/show/:id/checklist', isLoggedIn, catchAsync(async(req, res) =>{
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
    const chofer = await driver.findById(req.params.id)
    const check = new checklist(req.body)
    await check.save()
    chofer.checklist = check
    await chofer.save()
    res.redirect(`/driver/show/${chofer._id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error')
            console.log(e)
            res.redirect(`/driver/show/${chofer._id}`)
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect(`/driver/show/${chofer._id}`)
    }
}));
router.get('/test', isLoggedIn,catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        const choferes = await driver.find({})
        const buses = await Bus.find({})
        res.render('drivers/test', {choferes, buses})
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/')
    }
}));
router.post('/test', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const test = new drivingTest(req.body)
            await test.save()
            req.flash('success', 'La prueba de manejo se guardó correctamente.')
            res.redirect('/driver/test')
        } catch(e) {
            req.flash('error', 'Se produjo un error')
            res.redirect('/driver/test')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/')
    }
}));
router.get('/test/show', isLoggedIn, catchAsync(async(req, res) =>{
const drivingTests = await drivingTest.find({}).populate({path: 'driver'}).populate({path: 'unit'}).exec()
res.render('drivers/testShow', {drivingTests})
}));
router.get('/test/show/:id', isLoggedIn, catchAsync(async(req, res) => {
        await drivingTest.findById(req.params.id).populate({path: 'driver'}).populate({path: 'unit'}).exec((err, foundTests) =>{
        if(err){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/driver')
        }
        res.render('drivers/testDetails', {test: foundTests})
    })
    
}))
router.get('/audit', isLoggedIn, catchAsync(async(req, res) =>{ 
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        const choferes = await driver.find({})
        const buses = await Bus.find({})
        res.render('drivers/driverAudit', {choferes, buses})
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/')
    }
}));
router.put('/audit', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newAudit = new driverAudit(req.body)
            const chofer = await driver.findById(req.body.driver)
            await newAudit.save()
            chofer.audits.push(newAudit)
            await chofer.save()
            req.flash('success', 'La auditoria ha sido guardada correctamente.')
            res.redirect(`/driver/audit/${newAudit._id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error')
            console.log(e)
            res.redirect('/driver')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/driver/')
}
}));
router.get('/audit/:id', isLoggedIn, catchAsync(async(req, res) => {
    await driverAudit.findById(req.params.id).populate({path: 'driver'}).exec((err, foundAudit) =>{
        if(err) {
            req.flash('error', 'Se produjo un error')
            res.redirect('/driver')
        }
        res.render('drivers/driverAuditShow', {audit: foundAudit})
    })
}));

router.get('/list', isLoggedIn, catchAsync(async(req, res) => {
    try{
        await license.find({}).populate({path: 'driver'}).exec((err, licenses) =>{
            if(err) {
                req.flash('error', 'Se produjo un error')
                res.redirect('/driver')
            }
            res.render('drivers/license-list', {licenses})
        })
    } catch(e){
        req.flash('error', 'Se produjo un error.')
        res.redirect('/driver')
    }
}))
module.exports = router