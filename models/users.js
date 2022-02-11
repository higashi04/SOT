const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {type: Boolean, default: false},
    firstName: {type: String, default: 'blank'},
    lastName: {type: String, default: 'blank'}
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);