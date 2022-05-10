const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DriverSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Ya se cuenta con un registro utilizando ese nombre.']
    },
    phone: String,
    createdAt: 
    {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    active: 
    {
        type: Boolean,
        default: true
    },
    bus: {
        type: Schema.Types.ObjectId,
        ref: 'bus'
    },
    company: 
    {
        type: String,
    },
    coordinator: 
    {
        type: String,
    },
    license: {
        type: Schema.Types.ObjectId,
        ref: 'license'
    },
    checklist: {
        type: Schema.Types.ObjectId,
        ref: 'checklist'
    },
    fueDadoDeBaja: {
        type: Boolean,
        default: false,
    },
    audits: [
        {
            type: Schema.Types.ObjectId,
            ref: 'audit'
        }
    ],
    
    })

module.exports = mongoose.model('driver', DriverSchema)