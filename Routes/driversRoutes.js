const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const driver = require('../models/drivers');
const routes = require('../models/routesPerDriver');
const buses = require('../models/buses');


const serialMaker = () => {
    let prefix = ''
    var seq = 0
    return {
        set_prefix: p =>{
            prefix = String(p)
        },
        set_seq: s =>{
            seq = s + Math.floor(Math.random() * 999)
        },
        gensym: () => {
            const result = prefix + seq
            return result
        }
    }
}
const serial = () => {
    const seqer = serialMaker()
    seqer.set_prefix('RutaChofer')
    seqer.set_seq(1000);
    const unique = seqer.gensym();
    return unique
}

router.get('/', isLoggedIn,(req, res) =>{
    res.render('driving/home')
})

router.get('/new', isLoggedIn, catchAsync(async(req, res) =>{
    const choferes = await driver.find({}).exec()
    const bus = await buses.find({}).exec()
    res.render('driving/new', {choferes, bus})
}));

router.post('/new', isLoggedIn, catchAsync(async(req, res) =>{
    if(req.user.puesto === 'Auxiliar de Operaciones' || req.user.isAdmin) {
        try{
            const newRoute = new routes(req.body)
            newRoute.serial = serial()
            await newRoute.save()
            req.flash('success', 'El registro fue guardado con éxito.')
            res.redirect('/driving/new')
        } catch(e) {
            console.log(e)
            req.flash('error', 'Se produjo un error.')
            res.redirect('/driving')
        }
    } else {
        req.flash('error', 'No está autorizado para esto.')
        res.redirect('/driving')
    }
}));
router.get('/show', isLoggedIn, (req, res) =>{
    res.render('driving/show')
})
router.post('/getDriving', isLoggedIn, catchAsync(async(req, res) => {
    let payload = req.body.payload.trim()
    let search = await routes.find({driver: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search = search.slice(0, 10);
    res.send({payload: search})
}));
router.get('/show/:id', isLoggedIn, catchAsync(async(req, res) =>{
    await routes.findById(req.params.id).exec((err, list) =>{
        if(err){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/driving')
        }
            res.render('driving/details', {list: list})
    })
}))
module.exports = router