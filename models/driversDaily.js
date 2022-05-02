const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverDailySchema = new Schema({
    driver: [{
        type: Schema.Types.ObjectId,
        ref: 'driver',
    }],
    attendance: [String],
    asistencias: {
        type: Number,
        default: 0
    },
    faltas: {
        type: Number,
        default: 0
    },
    retardos: {
        type: Number,
        default: 0
    },
    justificado: {
        type: Number,
        default: 0
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'week'
    }
})

module.exports = mongoose.model('day', driverDailySchema)