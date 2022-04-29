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
        enum: [
            'OES',
            'MEDLINE',
            'BPI',
            'AISTERMI',
            'TRANSPORTES VILLARREAL'
        ]
    },
    coordinator: 
    {
        type: String,
        enum: [
            'Elizardo Brewster Rubio',
            'Jose Antonio Hernandez Garcia',
            'Jessica Alaniz',
            'David Benavides Chavez',
            'Jesus Nava',
            'Raymundo Zamora Garcia'
        ]
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
    ]
    })

module.exports = mongoose.model('driver', DriverSchema)