const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const {validaCompra} = require('../middleware/validate');

const Compra = require('../models/purchase');

const serialMaker = () => {
    let prefix = ''
    var seq = 0
    return {
        set_prefix: p =>{
            prefix = String(p)
        },
        set_seq: s =>{
            seq = s + Math.floor(Math.random() * 99999)
        },
        gensym: () => {
            const result = prefix + seq
            return result
        }
    }
}
const serial = () => {
    const seqer = serialMaker()
    seqer.set_prefix('Compra')
    seqer.set_seq(000000);
    const unique = seqer.gensym();
    return unique
}

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
})

router.post('/orden/new', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const compra = new Compra(req.body)
        compra.author = req.user
        compra.serial = serial()
        await compra.save()
        req.flash('success', 'Orden de compra guardada.')
        res.redirect('/compras/orden')
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        req.redirect('/compras')
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
    await Compra.findById(req.params.id).exec(function(err, foundOrder) {
        if(err){
            req.flash('error', 'Se produjo un error')
            return res.redirect('/');
        }
        res.render('compras/orderDetails', {order: foundOrder});
    })
}))

module.exports = router;