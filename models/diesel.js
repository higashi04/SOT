const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dieselSchema = new Schema({
    vale: [{
        type: String,
        unique: true
    }],
    date: [Date],
    tipo: [String],
    lts: [Number],
    costo: [Number],
    unidad: [String],
    chofer: [String],
    kms : [String],
    autoriza: [String]
})

module.exports = mongoose.model('diesel', dieselSchema);