var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    age: Number,
    queues: [{ type: Schema.Types.ObjectId, ref: 'queues' }]
});

var Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;