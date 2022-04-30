const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverDailySchema = new Schema({
    asistencias: [String],
    faltas: [String],
    retardos: [String],
    justificado: [String],
    driver: [{
        type: Schema.Types.ObjectId,
        ref: 'driver'
    }],
    list: {
        type: Schema.Types.ObjectId,
        ref: 'week'
    }
})

module.exports = mongoose.model('day', driverDailySchema)