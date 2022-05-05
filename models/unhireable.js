const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unhireableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    upDate: {
        type: Date,
        required: true
    },
    downDate: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('unhireable', unhireableSchema);