const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    day: {
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    isPresent: [{
        type: Boolean,
        default: false,
    }],
    isOnTime: [{
        type: Boolean,
        default: false,
    }],
    comments: [String]

})

module.exports = mongoose.model('attendance', attendanceSchema)