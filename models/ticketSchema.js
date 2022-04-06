const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    issueTitle: {
        type: String,
        required: true
    },
    userComments: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        default: () => Date.now()
    },
    isSolved: Boolean,
    sysAdminComments: [{
        type: String,
    }],
    solvedDate: {
        type: Date
    },
    severity: {
        type: String,
        enum: ['bajo', 'medio', 'alto']
    },
    serial: String
})

module.exports = mongoose.model('ticket', ticketSchema)