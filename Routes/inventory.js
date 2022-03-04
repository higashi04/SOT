const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const {validaInv} = require('../middleware/validate');
/////models/////
const User = require('../models/users');
const Inv = require('../models/inventory');

router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const inv = await Inv.find({}).populate({
        path: 'author',
        strictPopulate: false
    })
    res.render('inv/inv-show', {inv})
}))

router.get('/newItem', isLoggedIn, (req, res)=>{
    res.render('inv/new');
})
router.post('/newItem', isLoggedIn, validaInv,catchAsync(async(req, res)=>{
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
        console.log(e.message)
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
router.put('/show/:id', isLoggedIn, validaInv,catchAsync(async(req, res)=>{
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
        req.flash('error', 'Revise la cantidad')
        res.redirect('/inv/show')
    }
}));
router.put('/show/:id/remove', isLoggedIn, validaInv,catchAsync(async(req, res)=>{
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
        req.flash('error', 'Revise la cantidad')
        res.redirect('/inv/show')
    }
}))

router.get('/repairs', isLoggedIn, catchAsync(async(req, res)=>{
    await Inv.findOne({}).exec((err, foundItem) => {
        if (err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('inv/refacciones', {item: foundItem})
    })
}))

module.exports = router;

