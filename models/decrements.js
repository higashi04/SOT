const mongoose = require('mongoose')
const Schema = mongoose.Schema

const decrementsSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Inv'
    },
    date: Date,
    author: String,
    qty: Number
})

module.exports = mongoose.model('decrements', decrementsSchema)