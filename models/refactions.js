const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefacSchema = new Schema({
    partNum:[
         {
        type: String,
        required: true
    }
],
    object: [
        {
        type: String,
        required: true
    }
],
    qty: [
        {
        type: String,
        required: true
    }
],
    unit: {
        type: String,
        required: true
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
    comments: String
})

module.exports = mongoose.model('Refacc', RefacSchema);