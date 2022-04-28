const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');
const logrosSchema = require('../models/logrosSchema');

router.get('/', isLoggedIn, (req, res) => {
    res.send('hello, world!')
})


module.exports = router