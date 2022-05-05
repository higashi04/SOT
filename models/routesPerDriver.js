const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesPerDriverSchema = new Schema({
    driver: String,
    route: [String],
    service: [String],
    shift: [String],
    numOfPassengers: [String],
    startKm: [String],
    endKm: [String],
    startTime: [String],
    endTime: [String],
    date: [String],
    fuel: [String],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    serial: String,
    bus: String,
})

module.exports = mongoose.model('routes', routesPerDriverSchema)