const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dieselSchema = new Schema({
    vale: String,
    date: String,
    tipo: String,
    lts: Number,
    costo: Number,
    unidad: String,
    chofer: String,
    kms : String,
    autoriza: String
})

dieselSchema.virtual('total').get(function(){
    return this.lts * this.costo
})

module.exports = mongoose.model('diesel', dieselSchema);