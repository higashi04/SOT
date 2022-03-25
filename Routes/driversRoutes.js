const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
//models//
const Bus = require('../models/buses');
const driver = require('../models/drivers');

router.get('/',isLoggedIn, catchAsync(async(req, res) =>{
    const chofer = await driver.find({})
    res.render()
}))

module.exports = router