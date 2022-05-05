const mongoose = require('mongoose')
const JOI = require('joi');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {type: Boolean, default: false},
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    puesto: {
        type: String,
        enum: [
            'Recepcionista', 
            'Programador', 
            'Gerente de Operaciones', 
            'Gerente de Mantenimiento', 
            'Contador', 
            'Auxiliar Contable', 
            'Ejecutivo de Mantenimiento y Almacen',
            'Ejecutivo de Almacen y Diesel', 
            'Supervisor de Coordinadores', 
            'Auxiliar de Operaciones',
            'Supervisor de Mantenimiento',
            'Jefe de Mecánicos',
            'Analista de Procesos',
            'Ejecutivo de Compras',
        ],
        required: true
    },
    employeeNumber: Number,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.virtual('fullname').get(function(){
    const fullname = `${this.firstName} ${this.lastName}`
    return fullname
})


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);