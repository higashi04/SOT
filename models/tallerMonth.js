const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tallerMonthlySchema = new Schema({
    month: {
        type: String,
        enum: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    },
    tallerSchema: [{
        type: Schema.Types.ObjectId,
        ref: 'taller'
    }]
});

module.exports = mongoose.model('tallerMonthly', tallerMonthlySchema);