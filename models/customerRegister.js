const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const customerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

customerSchema.virtual('fullname').get(function(){
    const fullname = `${this.firstName} ${this.lastName}`
    return fullname
})

customerSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('customers', customerSchema)