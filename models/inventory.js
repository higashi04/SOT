const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    partNumber: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    estante: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    type: {
        type: String,
        enum: ['Refacción', 'Herramienta']
    },
    increments: [
        {
            qty: Number,
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
            ,
            fecha: {
                        type: Date,
                        default: () => Date.now(),
                        immutable: true
                    }
        }
    ],
    decrements: [
        {
            qty: Number,
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            fecha: {
                        type: Date,
                        default: () => Date.now(),
                        immutable: true
                    }
        }
    ]
});
module.exports = mongoose.model('Inv', InvSchema);