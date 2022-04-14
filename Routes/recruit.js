const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

const recruitmentSchema = require('../models/recruitment');

router.get('/', isLoggedIn, (req, res) => {
    res.render('reclutamiento/home')
});
router.get('/new', isLoggedIn, (req, res) =>{
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        res.render('reclutamiento/new')
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reclutamiento')
    }
});
router.post('/new', isLoggedIn, catchAsync(async(req, res)=>{
    if(req.user.puesto === 'Recepcionista' || req.user.isAdmin) {
        try{
            const newRecruit = new recruitmentSchema(req.body)
            await newRecruit.save()
            req.flash('success', 'Se guarda éxitosamente el registro.')
            res.redirect('/reclutamiento')
        } catch(e){
            req.flash('error', 'Se produjo un error.')
            res.redirect('/reclutamiento')
        }
    } else {
        req.flash('error', 'No tiene autorización para esto.')
        res.redirect('/reclutamiento')
    }
}));
router.get('/show', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const recruits = await recruitmentSchema.find({}).exec()
        res.render('reclutamiento/show', {recruits})
    } catch(e){
        req.flash('error', 'Se produjo un error.')
        res.redirect('/reclutamiento')
    }
}))
module.exports = router