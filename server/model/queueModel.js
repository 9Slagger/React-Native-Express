var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var queueSchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    queue_order: Number,
    status: String,
    priority: Number,
    record_date: Date,
});

var Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;