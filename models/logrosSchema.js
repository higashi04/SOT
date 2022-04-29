const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logrosSchema = new Schema({
    company: String,
    routesNotMade: String,
    driver: String,
    date: String,
    comments: String
})

module.exports = mongoose.model('logros', logrosSchema)