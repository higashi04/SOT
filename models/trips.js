const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
    date: String,
    hour: String,
    name: String,
    unit: String,
    where: String,
    fuelLoadDate: Date,
    fuelLoadQty: String,
    odometer: String,
    serial: {
        type: String,
    }

})

module.exports = mongoose.model('trips', tripsSchema)