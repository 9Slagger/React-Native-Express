const express = require('express')
const app = express.Router()
var bcrypt = require('bcryptjs')
const { getToken, verifyToken } = require('./jwtHandler')
const mongoose = require('./db_config')
const Customer = require('./model/customersModel')
const Employee = require('./model/employeesModel')
const Doctor = require('./model/doctorsModel')
const Queue = require('./model/queueModel')

// --------------------------------------------

const result_failed = {
  result: "failed",
  data: ""
};

// ---------- customer registor

app.post('/customer/register', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    age: req.body.age || 15
  });
  customer.save(function (err, data) {
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

// ---------- customer login

app.post('/customer/login', (req, res) => {

  Customer.find({ 'username': req.body.username }, (err, result) => {

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
    let queue = new Queue({
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

// ---------- mycustomer

app.get('/mycustomer', verifyToken, (req, res) => {
  Customer.findOne({ _id: res.id }).exec(function (err, data) {
    if (err) return handleError(err);
    else res.status(200).json(data)
    console.log(data)
  })
});

// let queue = new Queue({
//   title: "Dental",
//   author: "5b814841cd485844831d8638",
//   record_date: new Date(),
//   priority: 1,
// })
// queue.save(function (err) {
//   console.log(queue.record_date)
  // if ("2018-08-31T14:43:09.466Z" === "2018-08-31T14:43:09.466Z") {
  //   console.log("Yes")
  // }
  // else {
  //   console.log("No")
  // }


  var d1 = new Date();
  for(i=0;i < 10000000 ; i++){
    if(i === 9999) console.log("10000")
  }
  var d2 = new Date();
  console.log(d1.getTime() === d2.getTime()); // prints true (correct)
  let test = d1.getTime() - d2.getTime()
  console.log(test)

// });


module.exports = app;