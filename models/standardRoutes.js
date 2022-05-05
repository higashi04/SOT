const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const standardRoutes = new Schema({
    route: [String],
    driver: [{
        type: Schema.Types.ObjectId,
        ref: 'driver'
    }],
    numOfPassengers: [String],
    shift: [String],
    service: [String],
    startTime: [String],
    endTime: [String],
    date: Date,
    company: [String]
})

module.exports = mongoose.model('standardRoutes', standardRoutes)