const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const bajasSchema = require('../models/bajasSchema');
const catchAsync = require('../AsyncErrors');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('bajas/home')
})
router.get('/new', isLoggedIn, (req, res)=>{
    if(req.user.puesto === 'Analista de Procesos' || req.user.isAdmin) {
        res.render('bajas/new');
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/bajas');
    }
})
router.post('/new', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Analista de Procesos' || req.user.isAdmin) {
        try{
            const newBaja = new bajasSchema(req.body)
            newBaja.save()
            req.flash('success', 'Registro guardado correctamente.')
            res.redirect('/bajas/new')
        }catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/bajas/new')
        }
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/bajas/new')
    }
}));

router.get('/show', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const bajas = await bajasSchema.find({}).exec()
        res.render('bajas/show', {bajas})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/bajas')
    }
}));
module.exports = router;