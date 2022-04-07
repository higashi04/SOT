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
module.exports = router;