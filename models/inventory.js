const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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