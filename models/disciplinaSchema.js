const mongoose = require('mongoose')
const Schema = mongoose.Schema

const disciplinaSchema = new Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver'
    },
    date: String,
    reason: String,
    position: String,
    infrigementType: String
})

module.exports = mongoose.model('disc', disciplinaSchema)