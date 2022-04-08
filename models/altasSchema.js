const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const altasSchema = new Schema({
    name: String,
    adress: String,
    curp: String,
    rfc: String,
    upDate: String,
    comments: String
})

module.exports = mongoose.model('altas', altasSchema);