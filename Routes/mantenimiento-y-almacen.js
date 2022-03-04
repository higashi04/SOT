const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

const mtto = require('../models/mantenimiento');
const bus = require('../models/buses');
const Inv = require('../models/inventory');

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

router.put('/:id', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const mant = await mtto.findById(req.params.id)
        mant.status = req.body.status == 'true' ? true : false
        mant.completeDateRegister = Date.now()
        mant.save()
        req.flash('success', 'El cambio fue registrado correctamente.')
        res.redirect(`/mtto/${mant._id}`);
    } catch(e){
        req.flash('error', 'Se produjo un error')
        res.redirect('/mtto')
        console.log(e.message)
    }
}))

module.exports = router