const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin')
const catchAsync = require('../AsyncErrors');

const driversSchema = require('../models/drivers');
const alcoholimetroSchema = require('../models/alcoholimetro');

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
    seqer.set_prefix('Alcoholimetro')
    seqer.set_seq(000000);
    const unique = seqer.gensym();
    return unique
}

router.get('/', isLoggedIn, (req, res) => {
    res.render('alcoholimetro/home')
});

router.get('/OES', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'OES'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))
router.get('/bpi', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'BPI'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))
router.get('/MEDLINE', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'MEDLINE'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))
router.get('/aistermi', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'AISTERMI'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))
router.get('/ezo', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'EZO'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))
router.get('/tvillarreal', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'TRANSPORTES VILLARREAL'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))

router.post('/OES/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newTest = new alcoholimetroSchema(req.body)
            newTest.serial = serial()
            newTest.company = 'OES'
            await newTest.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/alcoholimetro')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/alcoholimetro')
    }
}))
router.post('/MEDLINE/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newTest = new alcoholimetroSchema(req.body)
            newTest.serial = serial()
            newTest.company = 'MEDLINE'
            await newTest.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/alcoholimetro')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/alcoholimetro')
    }
}))
router.post('/AISTERMI/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newTest = new alcoholimetroSchema(req.body)
            newTest.serial = serial()
            newTest.company = 'AISTERMI'
            await newTest.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/alcoholimetro')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/alcoholimetro')
    }
}))
router.post('/BPI/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newTest = new alcoholimetroSchema(req.body)
            newTest.serial = serial()
            newTest.company = 'BPI'
            await newTest.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/alcoholimetro')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/alcoholimetro')
    }
}))
router.post('/EZO/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newTest = new alcoholimetroSchema(req.body)
            newTest.serial = serial()
            newTest.company = 'BPI'
            await newTest.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/alcoholimetro')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/alcoholimetro')
    }
}))
router.post('tvillarreal/new', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.puesto === 'Supervisor de Coordinadores' || req.user.isAdmin) {
        try{
            const newTest = new alcoholimetroSchema(req.body)
            newTest.serial = serial()
            newTest.company = 'Transportes Villarreal'
            await newTest.save()
            req.flash('success', 'Se guarda el registro correctamente.')
            res.redirect('/alcoholimetro')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/alcoholimetro')
    }
}))


router.post('/getCompany', isLoggedIn, catchAsync(async(req, res) => {
    let payload = req.body.payload.trim()
    let search = await driversSchema.find({company: payload}).exec();
    res.send({payload: search})
}));

router.get('/OES/show', isLoggedIn, catchAsync(async(req, res) => {
    await alcoholimetroSchema.find({company: 'OES'}).exec((err, tests) => {
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
        res.render('alcoholimetro/show', {tests})
    })
}))
router.get('/MEDLINE/show', isLoggedIn, catchAsync(async(req, res) => {
    await alcoholimetroSchema.find({company: 'MEDLINE'}).exec((err, tests) => {
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
        res.render('alcoholimetro/show', {tests})
    })
}))
router.get('/AISTERMI/show', isLoggedIn, catchAsync(async(req, res) => {
    await alcoholimetroSchema.find({company: 'AISTERMI'}).exec((err, tests) => {
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
        res.render('alcoholimetro/show', {tests})
    })
}))
router.get('/BPI/show', isLoggedIn, catchAsync(async(req, res) => {
    await alcoholimetroSchema.find({company: 'BPI'}).exec((err, tests) => {
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
        res.render('alcoholimetro/show', {tests})
    })
}))
router.get('/EZO/show', isLoggedIn, catchAsync(async(req, res) => {
    await alcoholimetroSchema.find({company: 'BPI'}).exec((err, tests) => {
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
        res.render('alcoholimetro/show', {tests})
    })
}))
router.get('/tvillarreal/show', isLoggedIn, catchAsync(async(req, res) => {
    await alcoholimetroSchema.find({company: 'Transportes Villarreal'}).exec((err, tests) => {
        if(err) {
            req.flash('error', 'Se produjo un error.')
            res.redirect('/alcoholimetro')
        }
        res.render('alcoholimetro/show', {tests})
    })
}))

router.get('/OES/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const test = await alcoholimetroSchema.findById(req.params.id).populate({path: 'driver'}).exec()
    res.render('alcoholimetro/details', {test})
}))
router.get('/MEDLINE/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const test = await alcoholimetroSchema.findById(req.params.id).populate({path: 'driver'}).exec()
    res.render('alcoholimetro/details', {test})
}))
router.get('/AISTERMI/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const test = await alcoholimetroSchema.findById(req.params.id).populate({path: 'driver'}).exec()
    res.render('alcoholimetro/details', {test})
}))
router.get('/bpi/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const test = await alcoholimetroSchema.findById(req.params.id).populate({path: 'driver'}).exec()
    res.render('alcoholimetro/details', {test})
}))
router.get('/tvillarreal/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const test = await alcoholimetroSchema.findById(req.params.id).populate({path: 'driver'}).exec()
    res.render('alcoholimetro/details', {test})
}))
module.exports = router