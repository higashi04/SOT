const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

const mtto = require('../models/mantenimiento');
const bus = require('../models/buses');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('mantenimiento-y-almacen/home')
});

router.get('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    await mtto.findById(req.params.id).exec((err, foundMtto) => {
        if (err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/')
        }
        res.render('mantenimiento-y-almacen/detail', {orden: foundMtto})
    })
}))

module.exports = router