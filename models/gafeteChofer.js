const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gafeteChoferSchema = new Schema({
    chofer: {
        type: Schema.Types.ObjectId,
        ref: 'driver'
    },
    company: String,
    photo: {
        url: String,
        filename: String
    }
})

module.exports = mongoose.model('gafeteChoferes', gafeteChoferSchema);