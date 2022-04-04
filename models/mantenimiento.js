const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//ask if this ought to be it's own schema, as to avoid data replication, but seen the kms index it might be better to keep it as it's own schema
const MaintSchema = new Schema({
    plan: String,
    kms: String,
    startDate: Date,
    promisedDate: Date,
    realEndDate: Date,
    notificationDate: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    planta: String,
    workType: String,
    status: {
        type: Boolean,
        default: false,
    },
    workPlan: String,
    workshop: String,
    supervisor: String,
    workDone: String,
    materials: String,
    completeDateRegister: Date,
    serial: String
});

module.exports = mongoose.model('Maint', MaintSchema);