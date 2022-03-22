const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefacSchema = new Schema({
    partNumber:[
         {
        type: String,
        required: true
    }
],
    objeto: [
        {
        type: String,
        required: true
    }
],
    cantidad: [
        {
        type: String,
        required: true
    }
],
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'bus'
    },
    fecha: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    orden: {
        type: String,
        required: true
    },
    comments: String,
})

module.exports = mongoose.model('Refacc', RefacSchema);