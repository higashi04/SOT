const mongoose = require('mongoose');
const Schema = mongoose.Schema

const driverAttendanceSchema = new Schema({
    date: {
        type: Date,
        default: ()=> Date.now(),
        immutable: true
    },
    driver: [
        {
            type: Schema.Types.ObjectId,
            ref: 'driver'
        }
    ],
    day: {
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    inOne: [{
        type: Boolean
    }],
    outOne: [{
        type: Boolean
    }],
    inTwo: [{
        type: Boolean
    }],
    outTwo: [{
        type: Boolean
    }]
})

module.exports = mongoose.model('driverAttendance', driverAttendanceSchema);