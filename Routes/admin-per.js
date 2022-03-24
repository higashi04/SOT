const express = require('express');
const router = express.Router();
const catchAsync = require('../AsyncErrors');
const Users = require('../models/users');
const attendance = require('../models/attendance');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/', isLoggedIn,(req, res) =>{
    res.render('Administracion-de-personal/home')
});
router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const users = await Users.find({})
    res.render('Administracion-de-personal/show', {users})
}));

router.get('/attendance', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
    const users = await Users.find({})
    res.render('attendance/attendance', {users})
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/hr')
    }
}));
router.post('/attendance', isLoggedIn, catchAsync(async(req, res)=>{
    const users = await Users.find({})
    const newAttendance = new attendance()
    users.forEach((item, index) =>{
        newAttendance.user.push(item._id);
        newAttendance.isPresent.push(req.body.isPresent[index])
        newAttendance.isOnTime.push(req.body.isOnTime[index])
        newAttendance.comments.push(req.body.comments[index])
    })
    await newAttendance.save()
    req.flash('success', 'Se ha guardado correctamente el registro.')
    res.redirect('/hr')
}));
router.get('/attendance/show', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        const attendanceLists = await attendance.find({})
        res.render('attendance/show', {attendanceLists})
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/hr')
    }
}));
router.get('/attendance/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        await attendance.findById(req.params.id).populate({path: 'user'}).exec((err, foundList)=>{
            if(err){
                req.flash('error', 'Se produjo un error')
                res.redirect('/hr/attendance')
            }
            res.render('attendance/details', {list: foundList})
        })
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/hr')
    }
}))
module.exports = router