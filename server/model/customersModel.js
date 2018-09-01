var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    age: Number,
    queues: [{ type: Schema.Types.ObjectId, ref: 'queues' }]
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;