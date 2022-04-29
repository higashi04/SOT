const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const driver = require('../models/drivers');
const driverWeek = require('../models/driverWeekly');

router.get('/', isLoggedIn, catchAsync(async(req, res) => {
    const lists = await driverWeek.find()
    res.render('driversAttendance/home', {lists})
}))
router.post('/', isLoggedIn, catchAsync(async(req,res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin){
        try {
            const newAttendance = new driverWeek(req.body)
            await newAttendance.save()
            req.flash('success', 'Se crea el registro.')
            res.redirect('/driverAttendance')
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/driverAttendance')
        }
    } else {
        req.flash('error', 'No está autorizado para esta operación.')
        res.redirect('/driverAttendance')
    }
    
    
}));
router.get('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const list = await driverWeek.findById(req.params.id)
    const drivers = await driver.find({}).populate({path: 'bus'}).exec()
    res.render('driversAttendance/list', {list, drivers})
}))
router.put('/:id', isLoggedIn, catchAsync(async(req,res) =>{
    try {
        const list = await driverWeek.findById(req.params.id)
        const {asistencias, faltas, retardos, justificado} = req.body
        asistencias.forEach(i => list.asistencias.push(i))
        faltas.forEach(i => list.faltas.push(i))
        retardos.forEach(i => list.retardos.push(i))
        justificado.forEach(i => list.justificado.push(i))
        await list.save()
        req.flash('success', 'Se guarda el registro.')
        res.redirect(`/driverAttendance/${list._id}`)
    } catch(e) {
        console.log(e)
        res.redirect('/driverAttendance')
    }
}))
module.exports = router