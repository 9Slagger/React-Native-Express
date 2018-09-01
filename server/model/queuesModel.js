var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var queueSchema = Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    
    title: String,
    description: String,
    appointment_date: Date,
    record_date: Date,
    
    title: String,
    queue_order: Number,
    status: String,
    priority: Number,
    queue_date: Date,
});

var Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;