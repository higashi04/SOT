const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const driver = require('../models/drivers');
const driverAttendance = require('../models/driversAttendance');
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
// router.put('/:id/monday', isLoggedIn, catchAsync(async(req,res) =>{
//     const {id} = req.params
//     const drivers = await driver.find({})
//     const list = await driverAttendance.findById(id)
//     drivers.forEach((item, index) => {
//         list.driver.push(item._id) 
//         list.monday.attendance.push(req.body.monday[index]) 
//     })
//     await list.save()
//     console.log('+++++++++++++++')
//     console.log(list.monday.attendance)
//     console.log('+++++++++++++++')
//     console.log(req.body.tuesday)
//     res.redirect('/driverAttendance')
// }))
module.exports = router