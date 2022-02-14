const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./users')

// const IncrementSchema = new Schema({
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     qty: Number,
//     fecha: {
//         type: Date,
//         default: () => Date.now(),
//         immutable: true
//     }
// });

const DecrementSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    qty: Number,
    fecha: {
        type: Date,
        default: () => new Date.now().toLocaleDateString(),
        immutable: true
    }
});

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
            },
            fecha: {
                        type: Date,
                        default: () => Date.now(),
                        immutable: true
                    }
        }
    ],
    decrements: [
        DecrementSchema
    ]
});


module.exports = mongoose.model('Inv', InvSchema);