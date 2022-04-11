const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    date: {
        type: Date,
        default: () => Date.now()
    },
    time: [String],
    visitor: [String],
    message:[String],
    transfered: [String],
    ar: [String],
})

module.exports = mongoose.model('logs', logSchema)