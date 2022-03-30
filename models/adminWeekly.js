const mongoose = require('mongoose')
const Schema = mongoose.Schema

const weekSchema = new Schema({
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    monday: {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    tuesday:  {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    wednesday: {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    thursday:  {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    friday:  {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    saturday:  {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    sunday: {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
})

module.exports = mongoose.model('adminWeek', weekSchema)