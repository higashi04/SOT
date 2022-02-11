const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('mantenimiento-y-almacen/home')
})

module.exports = router