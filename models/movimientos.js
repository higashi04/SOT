const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MovSchema = new Schema (
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

module.exports = mongoose.model('Movimiento', MovSchema);