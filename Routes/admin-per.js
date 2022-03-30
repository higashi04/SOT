const express = require('express');
const router = express.Router();
const catchAsync = require('../AsyncErrors');
const Users = require('../models/users');
const attendance = require('../models/attendance');
const week = require('../models/adminWeekly');
const isLoggedIn = require('../middleware/isLoggedin');

const day = async(day, newAttendance, list) =>{
    switch (day.day) {
        case 'Lunes':
            list.monday = newAttendance
            await list.save()
            console.log(list)
            break;
        case 'Martes':
            list.tuesday = newAttendance
            await list.save()
            break;
        case 'Miércoles':
            list.wednesday = newAttendance
            await list.save()
            break;    
        case 'Jueves':
            list.thursday = newAttendance
            await list.save()
            break;    
        case 'Viernes':
            list.friday = newAttendance
            await list.save()
            break;    
        case 'Sábado':
            list.saturday = newAttendance
            await list.save()
            break;    
        case 'Domingo':
            list.sunday = newAttendance
            await list.save()
            break;    
        default:
            break;
    }
}

router.get('/', isLoggedIn,(req, res) =>{
    res.render('Administracion-de-personal/home')
});
router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const users = await Users.find({})
    res.render('Administracion-de-personal/show', {users})
}));

router.get('/attendance', isLoggedIn, catchAsync(async(req, res) =>{
    const lists = await week.find({})
    res.render('attendance/home', {lists})
}));
router.post('/attendance', isLoggedIn, catchAsync(async(req, res) =>{
    try {
        if (req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
            const newWeek = new week()
            newWeek.save()
            res.redirect('/hr/attendance')
        } else {
            req.flash('error', 'No está autorizado para esto.')
            res.redirect('/hr')
        }
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/hr')
    }
}))
router.get('/attendance/:id', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
    const users = await Users.find({})
    const list = await week.findById(req.params.id)
    .populate({path: 'monday'})
    .populate({path: 'tuesday'})
    .populate({path: 'wednesday'})
    .populate({path: 'thursday'})
    .populate({path: 'friday'})
    .populate({path: 'saturday'})
    .populate({path: 'sunday'}).exec()
    res.render('attendance/attendance', {users, list})
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/hr')
    }
}));
router.put('/attendance/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const users = await Users.find({})
    const newAttendance = new attendance()
    const list = await week.findById(req.params.id)
    users.forEach((item, index) =>{
        newAttendance.user.push(item._id);
        newAttendance.day = req.body.day
        newAttendance.isPresent.push(req.body.isPresent[index])
        newAttendance.isOnTime.push(req.body.isOnTime[index])
        newAttendance.comments.push(req.body.comments[index])
    })
    await newAttendance.save()
    day(req.body, newAttendance, list)
    req.flash('success', 'Se ha guardado correctamente el registro.')
    res.redirect('/hr')
}));

module.exports = router