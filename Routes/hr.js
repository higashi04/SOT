const express = require('express');
const router = express.Router();
const catchAsync = require('../AsyncErrors');
const Users = require('../models/users');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/', isLoggedIn,(req, res) =>{
    res.render('hr/home')
});
router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const users = await Users.find({})
    res.render('hr/show', {users})
}));

module.exports = router