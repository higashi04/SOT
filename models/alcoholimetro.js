const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alcoholimetroSchema = new Schema({
    date: [Date],
    driver:[ {
        type: String,
        required: true
    }],
    agree: [{
        type: Boolean,
        required: true
    }],
    result:[ {
        type: String,
        enum: ['Positivo', 'Negativo']
    }],
    comments: [String],
    performedBy: [String],
    serial: String
})

module.exports = mongoose.model('alch', alcoholimetroSchema);