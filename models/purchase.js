const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CompraSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    objeto: [String],
    partNumber: [String],
    cantidad: [Number],
    importe: [Number],
    author: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    serial: {
        type: String,
        unique: [true, 'El número asignado por sistema se repitió, favor de volver a intentar.']
    },
    date: {
        type: Date,
        default: ()=> Date.now(),
        immutable: true
    }
})
CompraSchema.plugin(AutoIncrement, {inc_field: 'serialNum'})
module.exports = mongoose.model('Compra', CompraSchema);