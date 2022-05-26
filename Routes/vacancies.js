const express = require("express");
const router = express.Router();
const catchAsync = require('../AsyncErrors');
const isLoggedIn = require('../middleware/isLoggedin');

const VacancySchema = require('../models/vacancies')

router.get('/', isLoggedIn, catchAsync(async(req, res) => {
    const vacantes = await VacancySchema.find({}).exec()
    res.render('vacancies/home', {vacantes})
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('vacancies/new')
});

router.post('/new', isLoggedIn, catchAsync(async(req, res) => {
  if (req.user.isAdmin || req.user.position === 'Analista de Procesos') {
    const newVacancy = new VacancySchema(req.body)
    await newVacancy.save()
    req.flash('success', 'Vacante creada con éxito.')
    res.redirect(`/vacantes/show/${newVacancy._id}`)
  } else {
      req.flash('error', 'No está autorizado para esta operación.')
      res.redirect('/vacantes')
  }
}))

router.get('/show/:id', isLoggedIn, catchAsync(async(req, res) => {
    const vacante = await VacancySchema.findById(req.params.id)
    res.render('vacancies/detail', {vacante})
}))

router.get('/edit/:id', isLoggedIn, catchAsync(async(req, res) => {
    const vacante = await VacancySchema.findById(req.params.id)
    res.render('vacancies/edit', {vacante})
}))
router.put('/edit/:id', isLoggedIn, catchAsync(async(req, res) => {
    if (req.user.isAdmin || req.user.position === 'Analista de Procesos') {
        const vacante = await VacancySchema.findByIdAndUpdate(req.params.id, req.body)
        if(req.body.covered === 'true') {
            vacante.covered = true
            vacante.coveredDate = Date.now()
        }
        await vacante.save()
        res.redirect(`/vacantes/show/${vacante._id}`)
    } else {
        req.flash('error', 'No está autorizado para esta operación.')
        res.redirect('/vacantes')
    }
}))
module.exports = router