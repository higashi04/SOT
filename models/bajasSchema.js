const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bajasSchema = new Schema({
    name: String,
    adress: String,
    curp: String,
    rfc: String,
    upDate: String,
    downDate: String,
    comments: String
})

module.exports = mongoose.model('bajas', bajasSchema);