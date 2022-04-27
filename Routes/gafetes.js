const express = require('express')
const router = express.Router()
const multer = require('multer');
const isLoggedIn = require('../middleware/isLoggedin')
const catchAsync = require('../AsyncErrors')
const {storage} = require('../cloudinary');
const upload = multer({ storage });

const gafeteChoferSchema = require('../models/gafeteChofer')
const driverSchema = require('../models/drivers');

router.get('/', isLoggedIn,(req, res) => {
    res.render('gaffete/home')
})

router.get('/new', isLoggedIn, catchAsync(async(req, res) => {
    const drivers = await driverSchema.find({}).exec()
    res.render('gaffete/new', {drivers})
}))

router.post('/new', isLoggedIn, upload.single('photo') ,catchAsync(async(req, res) => {
    const newGafete = new gafeteChoferSchema(req.body)
    newGafete.photo.url = req.file.path
    newGafete.photo.filename = req.file.filename
    await newGafete.save()
    console.log(newGafete)
    req.flash('success', 'Se genera gafete nuevo.')
    res.redirect('/gafete/new')
}))

router.get('/show', isLoggedIn, catchAsync(async(req, res) => {
    const gafetes = await gafeteChoferSchema.find({}).populate({path: 'chofer'}).exec()
    res.render('gaffete/show', {gafetes})
}))

router.get('/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const gafete = await gafeteChoferSchema.findById(req.params.id).populate({path: 'chofer'}).exec()
    res.render('gaffete/details', {gafete})
}))

module.exports = router