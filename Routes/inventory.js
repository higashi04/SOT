const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const {validaInv} = require('../middleware/validate');
/////models/////
const Inv = require('../models/inventory');


router.get('/', isLoggedIn, (req, res) =>{
    res.render('inv/home')
})

router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const inv = await Inv.find({}).populate({
        path: 'author',
        strictPopulate: false
    })
    res.render('inv/inv-show', {inv})
}));

router.post('/getInv', isLoggedIn, catchAsync(async(req, res) => {
    let payload = req.body.payload.trim()
    let search = await Inv.find({nombre: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search = search.slice(0, 10);
    res.send({payload: search})
}))

router.get('/newItem', isLoggedIn, (req, res)=>{
   if (req.user.isAdmin || req.user.puesto === 'Ejecutivo de Almacen y Diesel') {
    res.render('inv/new');
   } else {
       req.flash('error', 'No tiene autorización')
       res.redirect('/inv/show')
   }
})
router.post('/newItem', isLoggedIn, validaInv,catchAsync(async(req, res)=>{
    if(req.user.puesto === 'Ejecutivo de Almacen y Diesel') {
        try{
            const inv = new Inv(req.body)
            const qty = req.body.cantidad
            if(qty > 0)
               {
                inv.author = req.user 
                await inv.save();
                req.flash('success', 'Artículo añadido correctamente')
                res.redirect('/inv/newItem')
         } else {
             req.flash('error', 'Revise la cantidad')
             res.redirect('/inv/newItem')
         }
        } catch(e){
            req.flash('error', 'Se produjo un error al intentar el registro.')
            res.redirect('/inv/newItem')
        }
    } else {
        req.flash('error', 'No tiene autorización')
        res.redirect('/inv/show')
    }
}));
router.get('/show/:id', isLoggedIn,catchAsync(async(req, res)=>{
    await Inv.findById(req.params.id).populate({path: 'author'}).populate({
        path: 'decrements', 
        populate: {
            path: 'author'
        }}).populate({
            path: 'increments', 
            populate: {
                path: 'author'}}).exec(function(err, foundItem) {
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('inv/item', {item: foundItem});
    })
}))
router.put('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    if(req.user.puesto === 'Ejecutivo de Almacen y Diesel' || req.user.isAdmin) {
        try {
            const {id} = req.params;
            const qty = parseInt(req.body.cantidad)
            if(qty>0){
                const item = await Inv.findById(id)
                item.cantidad = parseInt(req.body.cantidad) + item.cantidad
                const updateData = {author: req.user, qty: qty}
                item.increments.push(updateData)
                await item.save()
                res.redirect(`/inv/show/${item._id}`)
            } else {
                req.flash('error', 'Revise la cantidad.')
                res.redirect('/inv/show')
            }
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/inv/show')
        }
    } else {
        req.flash('error', 'No tiene autorización')
        res.redirect('/inv/show')
    }
}));
router.put('/show/:id/remove', isLoggedIn, catchAsync(async(req, res)=>{
    if(req.user.puesto === 'Ejecutivo de Almacen y Diesel' || req.user.isAdmin) {
        try {
            const {id} = req.params;
            const qty = parseInt(req.body.cantidad)
            if(qty>0){
                const item = await Inv.findById(id)
                item.cantidad = item.cantidad - parseInt(req.body.cantidad)
                const updateData = {author: req.user, qty: qty}
                item.decrements.push(updateData)
                if(item.cantidad >= 0) {  
                await item.save()
                res.redirect(`/inv/show/${item._id}`)
                } else {
                    req.flash('error', 'Revise la cantidad')
                    res.redirect('/inv/show')
                }
            } else {
                req.flash('error', 'Revise la cantidad.')
                res.redirect('/inv/show')
            }
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/inv/show')
        }
    } else {
        req.flash('error', 'No tiene autorización')
        res.redirect('/inv/show')
    }
}));

router.get('/list', isLoggedIn, catchAsync(async(req, res) => {
    const inv = await Inv.find({}).exec()
    res.render('inv/list', {inv})
}))

module.exports = router;

