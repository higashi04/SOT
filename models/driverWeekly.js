const mongoose = require('mongoose');
const Schema = mongoose.Schema

const driverWeekSchema = new Schema({
    asistencias: [Number],
    faltas: [Number],
    retardos: [Number],
    justificado: [Number],
    choferes: [String],
    unidad: [String],
    tipoDeUnidad: [String],
    mes: String,
    date: {
        type: Date,
        default: () => Date.now()
    }

})

module.exports = mongoose.model('week', driverWeekSchema)