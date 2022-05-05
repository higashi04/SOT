const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/', (req, res)=>{
    res.render('QA/home')
})
module.exports = router
router.post('/qa', (req, res)=>{
    res.send(console.log('hello there'))
})