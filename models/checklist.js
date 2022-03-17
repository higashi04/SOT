const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistSchema = new Schema({
    employeeType: {
        type: String,
        enum: ['Nuevo Ingreso', 'Reingreso']
    },
    driveTest: Boolean,
    HRproccess: Boolean,
    rulesHandbook: Boolean,
    driverLicense: Boolean
})

module.exports = mongoose.model('checklist', checklistSchema);