const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const driver = require('../models/drivers');
const driverWeek = require('../models/driverWeekly');
const driverDaily = require('../models/driversDaily');

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
    const list = await driverWeek.findById(req.params.id).populate({path: 'day'}).exec()
    const drivers = await driver.find({}).populate({path: 'bus'}).exec()
    res.render('driversAttendance/new', {list, drivers})
}))
router.put('/:id', isLoggedIn, catchAsync(async(req,res) =>{
    try {
        const month = await driverWeek.findById(req.params.id)
        const drivers = await driver.find({fueDadoDeBaja: false})
        const list = new driverDaily()
        drivers.forEach( async(i, index) => {
            list.driver.push(i._id) 
            switch (req.body.asistencias[index]) {
                case '1':
                    list.asistencias.push(req.body.asistencias[index])
                    break;
                case '0':
                    list.asistencias.push(req.body.asistencias[index])
                    break;
                case 'T':
                    list.asistencias.push(req.body.asistencias[index])
                    break;
                case 'J':
                    list.asistencias.push(req.body.asistencias[index])
                    break;
                default:
                    break;
            }
        })
        list.list = month._id
        month.day.push(list._id)
        await month.save()  
        await list.save()
        req.flash('success', 'Se guarda el registro.')
        res.redirect(`/driverAttendance/${month._id}`)
    } catch(e) {
        console.log(e)
        res.redirect('/driverAttendance')
    }
}))
module.exports = router