const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tallerSchema = new Schema({
    unit: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    date: Date,
    isSolved: {
        type: Boolean,
        default: false
    },
    comments: {
        type: String,
        required: [true, 'Es necesario ingresar alguna observación y/o comentario']
    }
})

module.exports = mongoose.model('taller', tallerSchema);