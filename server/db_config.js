var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deltal');
mongoose.Promise = global.Promise;

module.exports = mongoose;