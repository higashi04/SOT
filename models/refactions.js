const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
    comments: String
})
RefacSchema.plugin(AutoIncrement, {inc_field: 'serial'})
module.exports = mongoose.model('Refacc', RefacSchema);