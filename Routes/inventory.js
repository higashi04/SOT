const express = require('express')
const router = express.Router();
const Inv = require('../models/inventory');
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const inv = await Inv.find({})
    res.render('inv/inv-show', {inv})
}))

router.get('/newItem', isLoggedIn, (req, res)=>{
    res.render('inv/new');
})
router.post('/newItem', isLoggedIn, catchAsync(async(req, res)=>{
    try{
        const inv = new Inv(req.body.inv)
        const qty = req.body.inv.cantidad
        if(qty > 0)
           { 
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
        console.log(e);
    }
}));
router.get('/show/:id', isLoggedIn,catchAsync(async(req, res)=>{
    Inv.findById(req.params.id, (err, foundItem)=>{
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('inv/item', {item: foundItem});
    })
}))
router.put('/show/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const {id} = req.params;
    const qty = parseInt(req.body.cantidad)
    if(qty>0){
        const sum = (a, b)=>{return a + b}
        const item = await Inv.findById(id)
        const newInv = sum(qty, item.cantidad)
        const updateInv = await Inv.findByIdAndUpdate(id, { item: {cantidad:{$in: newInv}}})
        console.log(item.cantidad + qty)
        console.log('**************')
        console.log(newInv)
        res.redirect(`/inv/show/${item._id}`)
    } else {
        req.flash('error', 'Revise la cantidad')
        res.redirect('/inv/show')
    }
}))
module.exports = router;

