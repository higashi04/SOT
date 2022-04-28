const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const logrosSchema = require('../models/logrosSchema');

router.get('/', isLoggedIn, (req, res) => {
    res.render('logros/home')
})

router.get('/show/oes', isLoggedIn, (req, res) => {
    const company = 'OES'
    res.render('logros/show', {company})
})
router.get('/show/bpi', isLoggedIn, (req, res) => {
    const company = 'BPI'
    res.render('logros/show', {company})
})
router.get('/show/medline', isLoggedIn, (req, res) => {
    const company = 'Medline'
    res.render('logros/show', {company})
})
router.get('/show/aistermi', isLoggedIn, (req, res) => {
    const company = 'AISTERMI'
    res.render('logros/show', {company})
})
router.get('/new/oes', isLoggedIn, (req, res) => {
    const company = 'OES'
    res.render('logros/new', {company})
})
router.get('/new/bpi', isLoggedIn, (req, res) => {
    const company = 'BPI'
    res.render('logros/new', {company})
})
router.get('/new/medline', isLoggedIn, (req, res) => {
    const company = 'Medline'
    res.render('logros/new', {company})
})
router.get('/new/aistermi', isLoggedIn, (req, res) => {
    const company = 'AISTERMI'
    res.render('logros/new', {company})
})
module.exports = router