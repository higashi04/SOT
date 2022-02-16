const mongoose = require('mongoose')
const JOI = require('joi');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {type: Boolean, default: false},
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    puesto: String,
    employeeNumber: Number,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);