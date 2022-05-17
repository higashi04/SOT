const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedin');
const catchAsync = require('../AsyncErrors');

const customerSchema = require('../models/customerRegister');

router.get('/', isLoggedIn, catchAsync(async(req, res) => {
    const customers = await customerSchema.find({}).exec()
    res.render('customers/home', {customers})
}))

router.post('/new', isLoggedIn, catchAsync(async(req, res) => {
    try {
        const { email, username, password, firstName, lastName, company } = req.body;
        const newCustomer = new customerSchema({ email, username, firstName, lastName, company })
        await customerSchema.register(newCustomer, password)
        req.flash('success', 'Se guarda correctamente el perfil del cliente.')
        res.redirect(`/clientes/${newCustomer._id}`)
    } catch(e) {
        console.log(e)
        req.flash('error', 'Se produjo un error.')
        res.redirect('/clientes')
    }
}));

router.get('/:id', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const customer = await customerSchema.findById(req.params.id)
        res.render('customers/show', {customer})
    } catch(e) {
        console.log(e)
        req.flash('error', 'Se produjo un error.')
        res.redirect('/clientes')
    }
}))

router.get('/:id/edit', isLoggedIn, catchAsync(async(req, res) => {
    try{
        const customer = await customerSchema.findById(req.params.id)
        res.render('customers/edit', {customer})
    } catch(e) {
        console.log(e)
        req.flash('error', 'Se produjo un error.')
        res.redirect('/clientes')
    }
}))

router.put('/:id/edit', isLoggedIn, catchAsync(async(req, res) => {
    const customer = await customerSchema.findByIdAndUpdate(req.params.id, req.body)
    await customer.save()
    res.redirect(`/clientes/${customer._id}`)
}))

router.delete('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const {id} = req.params;
    await customerSchema.findByIdAndDelete(id)
    req.flash('success', 'Usuario eliminado.')
    res.redirect('/clientes')
}));
module.exports = router