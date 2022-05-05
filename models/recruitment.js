const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruitmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    answered: {
        type: Boolean,
        required: true
    },
    meetsReq: {
        type: Boolean,
        required: true
    },
    willInterview: Boolean,
    interviewDate: Date,
    comments: String
})

module.exports = mongoose.model('recruit', recruitmentSchema);