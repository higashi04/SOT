const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drivingTestSchema = new Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver'
    },
    registerDate: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    testDate: {
        type: Date,
        required: true
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'bus'
    },
    turnOnEngine: {
        type: Boolean,
        required: true
    },
    firstEngine: {
        type: Boolean,
        required: true
    },
    engineChange: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    focus: {
        type: Boolean,
        required: true
    },
    reverse: {
        type: Boolean,
        required: true
    },
    brake: {
        type: Boolean,
        required: true
    },
    speed: {
        type: Boolean,
        required: true
    },
    turnEngineOff: {
        type: Boolean,
        required: true
    },
    precautions: {
        type: Boolean,
        required: true
    },
    pass: {
        type: Boolean,
        required: true
    },
    comments: String
});

module.exports = mongoose.model('test', drivingTestSchema)