const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    cantidad: Number
});


module.exports = mongoose.model('Inv', InvSchema);