const mongoose = require('mongoose');
const Schema = mongoose.Schema

const driverWeekSchema = new Schema({
    mes: String,
    date: {
        type: Date,
        default: () => Date.now()
    },
    day: [{
        type: Schema.Types.ObjectId,
        ref: 'day'
    }]
})

module.exports = mongoose.model('week', driverWeekSchema)