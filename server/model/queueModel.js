var mongoose = require('mongoose');

var queueSchema = mongoose.Schema({
    orderqueue: String,
    room: String,
    users_id: String,
});

var Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;