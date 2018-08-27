const express = require('express');
const app = express.Router();
var bcrypt = require('bcryptjs');
const { getToken, verifyToken } = require('./jwtHandler');
const mongoose = require('./db_config')
const User = require('./model/usersModel')
const Queue = require('./model/queueModel')
const Person = require('./model/personModel')
const Story = require('./model/storyModel')

// --------------------------------------------

const result_failed = {
  result: "failed",
  data: ""
};

// ----------สมัคร ID member

app.post('/register', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    type: req.body.type || 'member',
    age: req.body.age || 15
  });
  user.save(function (err, data) {
    if (err) {
      res.json(result_failed);
      console.log(err)
    }
    else {
      const finalResult = {
        result: "success",
        data: " "
      };
      res.json({ result: "success " + data.username })
    }
  });
});

// ---------- login

app.post('/login', (req, res) => {

  User.find({ 'username': req.body.username }, (err, result) => {

    if (err) {
      res.json(result_failed);
    } else {
      if (result.length > 0) {
        const passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
        if (!passwordIsValid) return res.json(result_failed);

        var _username = result[0].username;
        var _id = result[0].id;
        var _type = result[0].type;

        var token = getToken({ id: _id, username: _username, type: _type })

        const finalResult = {
          result: "success",
          data: token
        };

        res.json(finalResult);
      } else {
        const finalResult = {
          result: "failed",
          data: " "
        };
        res.json(finalResult);
      }
    }
  });
});

// ----------สร้าง Queue
app.post('/queue', verifyToken, (req, res) => {
  if (res.type === 'member' || res.type === 'employee') {
    var queue = new Queue({
      title: req.body.title || "Dental",
      author: res.id
    })
    queue.save(function (err) {
      if (err) return handleError(err);
      else res.status(201).json(queue)
    });
  }
  else res.json({ result: "error" })
});

// ---------- ค้าหา queue ทั้งหมด
app.get('/queue', verifyToken, (req, res) => {
  Queue.find().exec(function (err, data) {
    if (err) return handleError(err);
    else res.status(200).json(data)
  })
})

// ---------- feed

app.get('/feed', verifyToken, (req, res) => {
  res.json({ result: "success " + res.username + res.id })
});

// ---------- myuser

app.get('/myuser', verifyToken, (req, res) => {
  User.findOne({ _id: res.id }).exec(function (err, data) {
    if (err) return handleError(err);
    else res.status(200).json(data)
    console.log(data)
  })
});

module.exports = app;