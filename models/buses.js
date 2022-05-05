const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const busSchema = new Schema({
    brandTC: String,
    modelTC: String,
    serie: String,
    yearTC: String,
    unidad: {
        type: String,
        unique: true
    },
    ubicacion: String,
    tipo: String,
    mantenimiento: [{
        type: Schema.Types.ObjectId,
        ref: 'Maint'
    }]
});

module.exports = mongoose.model('bus', busSchema);

