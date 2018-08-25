var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    type: String,
    age: Number,
    queues: [{ type: Schema.Types.ObjectId, ref: 'queues' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;