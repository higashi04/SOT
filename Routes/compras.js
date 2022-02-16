const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

router.get('/', isLoggedIn, (req, res) =>{
    res.render('compras/home')
});
router.get('/orden', isLoggedIn, (req, res) => {
    res.render('compras/ordenNew')
})


module.exports = router;