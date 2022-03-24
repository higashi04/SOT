const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
        required: true
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