const express = require('express')
const router = express.Router()
const catchAsync = require('../AsyncErrors');
const isLoggedIn = require('../middleware/isLoggedin');
const drivers = require('../models/drivers');
const units = require('../models/buses')
const trips = require('../models/trips')
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
    seqer.set_prefix('Recorrido')
    seqer.set_seq(1000);
    const unique = seqer.gensym();
    return unique
}

router.get('/', isLoggedIn, (req, res) => {
    res.render('trips/home')
});
router.get('/new', isLoggedIn, catchAsync(async(req, res) => {
    const choferes = await drivers.find({})
    const buses = await units.find({})
    res.render('trips/new', {choferes, buses})
}))
router.post('/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin){
        try {
            const newTrip = new trips(req.body)
            newTrip.serial = serial()
            await newTrip.save()
            console.log(newTrip)
            res.redirect('/trips')
        } catch(e){
            console.log(e)
            res.redirect('/trips')
        }
    } else {
        req.flash('error', 'No está autorizado para esta operación.')
        res.redirect('/trips')
    }
}));
router.get('/show', isLoggedIn, (req, res) =>{
    res.render('trips/show')
})

module.exports = router