const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitChecklist = new Schema({
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'bus'
    },
    date: Date,
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver'
    },
    sideMirrors: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    windshield: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    wipers: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    fuel: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    seatbelt: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    lights: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    insideCleaness: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    outsideCleaness: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    seats: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    windows: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    horn: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    doors: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    frontWheels: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    backWheels: {
        type: String,
        enum: ['Sí', 'No', 'N/A']
    },
    comments: String,
    inspectedBy: String
})

module.exports = mongoose.model('unitChecklist', unitChecklist)