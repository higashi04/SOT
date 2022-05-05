const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

const tallerSchema = require('../models/taller');
const tallerMonthlySchema = require('../models/tallerMonth');
const buses = require('../models/buses');

router.get('/show', isLoggedIn, catchAsync(async(req, res) =>{
    const tallerMes = await tallerMonthlySchema.find({})
    res.render('taller/show', {tallerMes})
}));
router.post('/show', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Ejecutivo de Mantenimiento y Almacen' || req.user.isAdmin){
        try{
            const newTallerMes = new tallerMonthlySchema(req.body)
            await newTallerMes.save()
            req.flash('success', 'Se genera plantilla mensual.')
            res.redirect('/taller/show')
        }catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/taller/show')
        }
    } else {
        req.flash('error', 'No tienes autorización para esto.')
        res.redirect('/taller/show')
    }
}));
router.get('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const mes = await tallerMonthlySchema.findById(req.params.id).populate({path: 'tallerSchema'}).exec()
    const units = await buses.find({})
    res.render('taller/details', {mes, units})
}));
router.put('/show/:id', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Ejecutivo de Mantenimiento y Almacen' || req.user.isAdmin) {
        try {
            const newTaller = new tallerSchema(req.body)
            await newTaller.save()
            const mes = await tallerMonthlySchema.findById(req.params.id)
            mes.tallerSchema.push(newTaller)
            await mes.save()
            res.redirect(`/taller/show/${mes._id}`)
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/taller/show')
        }
    } else {
        req.flash('error', 'No tienes autorización para esto.')
        res.redirect('/taller/show')
    }
}));
router.get('/solved/:id', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Ejecutivo de Mantenimiento y Almacen' || req.user.isAdmin) {
        const taller = await tallerSchema.findById(req.params.id)
        res.render('taller/solved', {taller})
    }else {
        req.flash('error', 'No tienes autorización para esto.')
        res.redirect('/taller/show')
    }
}));
router.put('/solved/:id', isLoggedIn, catchAsync(async(req, res) => {
    if(req.user.puesto === 'Ejecutivo de Mantenimiento y Almacen' || req.user.isAdmin) {
        try{
            const taller = await tallerSchema.findById(req.params.id)
            taller.isSolved = req.body.isSolved === 'true' ? true : false
            await taller.save()
            req.flash('success', 'Se actualiza la información correctamente.')
            res.redirect('/taller/show')
        } catch {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/taller/show')
        }
    }else {
        req.flash('error', 'No tienes autorización para esto.')
        res.redirect('/taller/show')
    }
}))
module.exports = router