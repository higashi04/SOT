const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logrosSchema = new Schema({
    company: String,
    routesNotMade: Number,
    complaints: String,
    date: String
})

module.exports = mongoose.model('logros', logrosSchema)