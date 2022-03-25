const mongoose = require('mongoose');
const Schema = mongoose.Schema

const driverWeekSchema = new Schema({
    kind: {
        type: String,
        enum: ['Horario Normal', 'Tiempo Extra']
    },
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    monday: {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
    tuesday:  {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
    wednesday: {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
    thursday:  {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
    friday:  {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
    saturday:  {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
    sunday: {
        type: Schema.Types.ObjectId,
        ref: 'driverAttendance'
    },
})

module.exports = mongoose.model('week', driverWeekSchema)