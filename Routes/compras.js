const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

const Compra = require('../models/purchase');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('compras/home')
});
router.get('/orden', isLoggedIn, (req, res) => {
    res.render('compras/ordenNew')
})

router.post('/orden/new', isLoggedIn, catchAsync(async(req, res) => {
    const {importe, nombre, cantidad, telefono, objeto} = req.body
    console.log(req.body)
    const compra = new Compra(req.body)
    compra.author = req.user
    const compraObj = {objeto: objeto}
    const compraQty = {cantidad: cantidad}
    const compraPrice = {importe: importe}
    compra.compra.push(compraObj, compraQty, compraPrice);
    await compra.save()
    req.flash('success', 'Orden de compra guardada.')
    res.redirect('/compras/orden')
}));

router.get('/show', isLoggedIn, catchAsync(async(req,res)=>{
    const compra = await Compra.find({}).populate({
        path: 'author'
    })
    res.render('compras/show', {compra})
}))

router.get('/show/:id', isLoggedIn, catchAsync(async(req, res) =>{
    await Compra.findById(req.params.id).exec(function(err, foundOrder) {
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('compras/orderDetails', {order: foundOrder});
    })
}))

module.exports = router;