const mongoose = require('mongoose');
const Schema = mongoose.Schema

const driverAuditSchema = new Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    parking: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    noCommerce: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    currentDriverLicense: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    unitId: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    formFtv012: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    formFtv006: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    safetyVest: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    credential: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    faceMask: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    gel: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    extinguisher: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    firstAidKit: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    gps: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    hydraulicJack: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    wrench: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    spareTire: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    safetyTriangle: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
})

module.exports = mongoose.model('audit', driverAuditSchema)