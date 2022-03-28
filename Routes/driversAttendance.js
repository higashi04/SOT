const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const driver = require('../models/drivers');
const driverAttendance = require('../models/driversAttendance');
const driverWeek = require('../models/driverWeekly');
const drivers = require('../models/drivers');

const day = async(day, newAttendance, list, choferes) =>{
    switch (day.day) {
        case 'Lunes':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.monday = newAttendance
            await list.save()
            break;
        case 'Martes':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.tuesday = newAttendance
            await list.save()
            break;
        case 'Miércoles':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.wednesday = newAttendance
            await list.save()
            break;    
        case 'Jueves':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.thursday = newAttendance
            await list.save()
            break;    
        case 'Viernes':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.friday = newAttendance
            await list.save()
            break;    
        case 'Sábado':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.saturday = newAttendance
            await list.save()
            break;    
        case 'Domingo':
            choferes.forEach((item, index) =>{
                newAttendance.driver.push(item._id)
                newAttendance.inOne.push(day.inOne[index] === 'true' ? true : false)
                newAttendance.outOne.push(day.outOne[index] === 'true' ? true : false)
                newAttendance.inTwo.push(day.inTwo[index] === 'true' ? true : false)
                newAttendance.outTwo.push(day.outTwo[index] === 'true' ? true : false)
            })
            await newAttendance.save()
            list.sunday = newAttendance
            await list.save()
            break;    
        default:
            break;
    }
}

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
    .populate({path: 'monday', 
    populate: {
        path: 'driver', 
        populate: {
            path: 'bus'}}}).populate({path: 'tuesday'})
    .populate({path: 'wednesday'}).populate({path: 'thursday'})
    .populate({path: 'friday'}).populate({path: 'saturday'}).populate({path: 'sunday'})
    const drivers = await driver.find({}).populate({path: 'bus'}).exec()
    res.render('driversAttendance/list', {list, drivers})
}))
router.put('/:id', isLoggedIn, catchAsync(async(req,res) =>{
    try {
        const {id} = req.params
        const newAttendance = new driverAttendance(day.body)
        const choferes = await drivers.find({})
        const list = await driverWeek.findById(id)
        day(req.body, newAttendance, list, choferes)
        res.redirect('/driverAttendance')
    } catch(e) {
        console.log(e)
        res.redirect('/driverAttendance')
    }
}))
module.exports = router