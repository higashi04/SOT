const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LicenseSchema = new Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver'
    },
    licenseType: String,
    number: String,
    startDate: Date,
    expirationDate: Date,
})

module.exports = mongoose.model('license', LicenseSchema)