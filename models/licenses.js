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

LicenseSchema.virtual('expires').get(function(){
    const minsInDay = 1000 * 3600 * 24
    const today = new Date()
    const expDate = new Date(this.expirationDate)
    const daysToExp = Math.ceil((expDate.getTime() - today.getTime())/minsInDay)
    return daysToExp
});

LicenseSchema.virtual('days').get(function(){
    const minsInDay = 1000 * 3600 * 24
    const diff = this.expirationDate - this.startDate
    const days = Math.floor(diff/minsInDay)
    return days
})
    
module.exports = mongoose.model('license', LicenseSchema)