const express = require('express');
const app = express.Router();
var bcrypt = require('bcryptjs');
const { getToken, verifyToken } = require('./jwtHandler');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopper');
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User', userSchema);

// --------------------------------------------

const result_failed = {
  result: "failed",
  data: ""
};

app.post('/register', (req, res) => {
  console.log(req.body);
  const obj = req.body;
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var person = new User({ username: req.body.username, password: req.body.password });
  person.save(function (err, data) {
    if (err) {
      res.json(result_failed);
    } else {
      const finalResult = {
        result: "success",
        data: ""
      };
      res.json(finalResult);
      console.log("1 record inserted");
    }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const obj = req.body;

  var sql = `SELECT 
             id,             
             username, 
             password 
             FROM users 
             where username = '${req.body.username}'`;
             
  User.find({ 'username': req.body.username}, (err, result) => {

    if (err) {
      res.json(result_failed);
    } else {
      if (result.length > 0) {
        const passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
        if (!passwordIsValid) return res.json(result_failed);

        var _username = result[0].username;
        var _id = result[0].id;

        var token = getToken({ id: _id, username: _username })

        const finalResult = {
          result: "success",
          data: token
        };

        console.log(JSON.stringify(finalResult));
        res.json(finalResult);
      } else {
        const finalResult = {
          result: "failed",
          data: ""
        };
        console.log(JSON.stringify(finalResult));
        res.json(finalResult);
      }
    }
    console.log("1 record inserted");
  });
});

app.get('/feed', verifyToken, (req, res) => {
  res.json({ result: "success" + res.username})
});

module.exports = app;