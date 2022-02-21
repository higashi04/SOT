const mongoose = require('mongoose')
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
        }
    
})

module.exports = mongoose.model('Compra', CompraSchema);