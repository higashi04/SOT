const express = require('express');
const route = express.Router()
const { Server } = require('socket.io')
const isLoggedIn = require('../middleware/isLoggedin')
const catchAsync = require('../AsyncErrors')
//models
const dmSchema = require('../models/messaging');
const userSchema = require('../models/users');

route.get('/', isLoggedIn, catchAsync(async(req, res) => {
    const users = await userSchema.find({}).exec()
    res.render('messaging/home', {users})
}))
route.get('/chat', isLoggedIn, catchAsync(async(req, res) => {
    req.flash('error', 'Error 404, sitio en construccion')
    res.redirect('/')
}))
route.post('/new/:id', isLoggedIn, catchAsync(async(req, res) => {
    const newDm = new dmSchema()
    newDm.receiver = [req.params.id]
    newDm.sender = req.user
    await newDm.save()
    res.redirect(`/inbox/chat/${newDm._id}`)
}))
route.get('/chat/:id', isLoggedIn, catchAsync(async(req, res) => {
    const dm = await dmSchema.findById(req.params.id).populate({path: 'receiver'}).populate({path: 'sender'}).exec()
    console.log(dm)
    res.render('messaging/chat', {dm})
}))

// route.put('/newMessage/:id', isLoggedIn, catchAsync(async(req, res) => {
//     const dm = await dmSchema.findById(req.params.id)
//     dm.messages.push(req.body)
 
// }))
route.post('/chat/:id', isLoggedIn, catchAsync(async(req, res) => {
    const dm = await dmSchema.findById(req.params.id)
    res.send({dm})
}))
module.exports = route