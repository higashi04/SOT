const express = require('express');
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const drivers = require('../models/drivers');
const disciplinaSchema = require('../models/disciplinaSchema');

router.get('/', isLoggedIn, (req, res) => {
    res.render('disc/home')
})
router.get('/show', isLoggedIn, catchAsync(async(req, res) => {
    const registers = await disciplinaSchema.find({}).populate({path: 'driver'}).exec()
    res.render('disc/show', {registers})
}))
router.get('/new', isLoggedIn, catchAsync(async(req, res) => {
    const choferes = await drivers.find({}).exec()
    res.render('disc/new', {choferes})
}))
router.post('/new', isLoggedIn, catchAsync(async(req, res)=>{
    if(req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try {
            const newDisc = new disciplinaSchema(req.body)
            newDisc.save()
            req.flash('succes', 'Se guarda el registro correctamente.')
            res.redirect('/disc/show')
        } catch(e) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/disc')
        }
    }
}))
module.exports = router