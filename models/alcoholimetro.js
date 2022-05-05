const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alcoholimetroSchema = new Schema({
    date: [Date],
    driver:[ {
        type: Schema.Types.ObjectId,
        ref: 'driver',
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
    company: String,
    serial: String
})

module.exports = mongoose.model('alch', alcoholimetroSchema);