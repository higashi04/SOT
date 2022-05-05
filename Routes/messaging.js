const express = require('express');
const route = express.Router()
const isLoggedIn = require('../middleware/isLoggedin')
const catchAsync = require('../AsyncErrors')


route.get('/', isLoggedIn, catchAsync(async(req, res) => {
    res.render('messaging/home')
}))


module.exports = route