const express = require('express');
const router = express.Router();
const catchAsync = require('../AsyncErrors');
const Users = require('../models/users');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/', isLoggedIn,(req, res) =>{
    res.render('Administracion-de-personal/home')
});
router.get('/show', isLoggedIn, catchAsync(async(req, res)=>{
    const users = await Users.find({})
    res.render('Administracion-de-personal/show', {users})
}));

module.exports = router