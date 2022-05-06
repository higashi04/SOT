const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [String]
})

module.exports = mongoose.model('dms', messagesSchema)