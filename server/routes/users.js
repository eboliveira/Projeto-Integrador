const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;


const router = express.Router();

router.get('/', (req, res) => {
    res.send("teste")
})

router.post('/register', (req,res) => {
  let new_user = {}
  new_user.username = req.body.username;
  new_user.password = req.body.password;
  bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err){
          return res.status(500).send()
      }
      bcrypt.hash(new_user.password, salt, (err, hash) => {
          new_user.password = hash
          User.addUser(new_user, function (err, evnt) {
              if (err) {
                  console.log(err)
                  return res.status(400).send('server could not understand the request')
              }
              res.status(201).json("user registred")
          })
      })
  })
})

module.exports = {
    path: '/user',
    router: router
}
