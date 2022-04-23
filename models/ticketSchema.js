const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
ticketSchema.plugin(AutoIncrement, {inc_field: 'serie1'})
module.exports = mongoose.model('ticket', ticketSchema)