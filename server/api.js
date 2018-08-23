const express = require('express');
const app = express.Router();
var bcrypt = require('bcryptjs');
const { getToken, verifyToken } = require('./jwtHandler');
const moongoose = require('./db_config')
const User = require('./model/usersModel')
const Queue = require('./model/queueModel')

// --------------------------------------------

const result_failed = {
  result: "failed",
  data: ""
};

app.post('/queue', verifyToken, (req, res) => {
  console.log(req.$id)
// ObjectId("534009e4d852427820000002"),
  var queue = new Queue({ orderqueue: req.body.orderqueue, room: req.body.room, users_id: 'ObjectId("'+req.$id+'")'});
  queue.save(function (err, data) {
    if (err) {
      res.json(result_failed)
    }
    else {
      const finalResult = {
        result: "success",
        data: " "
      }
      res.json(finalResult)
    console.log("1 record inserted");
    }
  })
})

app.post('/register', (req, res) => {
  console.log(req.body);
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var person = new User({ username: req.body.username, password: req.body.password, type: req.body.type });
  person.save(function (err, data) {
    if (err) {
      res.json(result_failed);
    }
    else {
      const finalResult = {
        result: "success",
        data: " "
      };
      res.json({ result: "success " + res.username })
      console.log("1 record inserted");
    }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);

  User.find({ 'username': req.body.username }, (err, result) => {

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
          data: " "
        };
        console.log(JSON.stringify(finalResult));
        res.json(finalResult);
      }
    }
    console.log("1 record inserted");
  });
});

app.get('/feed', verifyToken, (req, res) => {
  res.json({ result: "success " + res.username })
});

module.exports = app;