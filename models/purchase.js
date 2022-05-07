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
    objeto: [{
        type: String,
        required: true
    }],
    partNumber: [{
        type: String,
        required: [true, 'El campo Número de Parte es obligatorio, en caso de no contar con él favor de escribir N/A']
    }],
    cantidad: [{
        type: Number,
        required: [true, 'El campo Cantidad es obligatorio.']
    }],
    importe: [{
        type: Number,
        required: [true, 'El campo Importe es obligatorio.']
    }],
    author: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    serial: {
        type: String,
        
    },
    date: {
        type: Date,
        default: ()=> Date.now(),
        immutable: true
    }
})
CompraSchema.plugin(AutoIncrement, {inc_field: 'serialNum'})
module.exports = mongoose.model('Compra', CompraSchema);