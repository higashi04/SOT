const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const {validaCompra} = require('../middleware/validate');

const Compra = require('../models/purchase');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('compras/home')
});
router.get('/orden', isLoggedIn, (req, res) => {
    if (req.user.puesto === 'Ejecutivo de Compras' || req.user.isAdmin) {
        res.render('compras/ordenNew')
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/compras/')
    }
});
router.post('/orden/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Ejecutivo de Compras' || req.user.isAdmin) {
        try{
            const compra = new Compra(req.body)
            compra.author = req.user
            await compra.save()
            req.flash('success', 'Orden de compra guardada.')
            res.redirect('/compras/orden')
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            console.log(e)
            res.redirect('/compras')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/compras')
    }
}));

router.get('/show', isLoggedIn, catchAsync(async(req,res)=>{
    await Compra.find({}).populate({
        path: 'author'
    }).exec((err, foundCompra) => {
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('compras/show', {compra: foundCompra})
    }) 
}))

router.get('/show/:id', isLoggedIn, catchAsync(async(req, res) =>{
    try {
        await Compra.findById(req.params.id).exec(function(err, foundOrder) {
            if(err){
                req.flash('error', 'Se produjo un error')
                return res.redirect('/');
            }
            res.render('compras/orderDetails', {order: foundOrder});
        })
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/compras/show')
    }
}))

module.exports = router;