const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin')
const catchAsync = require('../AsyncErrors');

const driversSchema = require('../models/drivers');
const alcoholimetroSchema = require('../models/alcoholimetro');

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
router.get('/medline', isLoggedIn, catchAsync(async(req, res) => {
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
router.get('/tvillarreal', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const drivers = await driversSchema.find({company: 'TRANSPORTES VILLARREAL'}).exec()
        res.render('alcoholimetro/new', {drivers})
    } catch(e) {
        req.flash('error', 'Se produjo un error.')
        res.redirect('/alcoholimetro')
    }
}))

module.exports = router