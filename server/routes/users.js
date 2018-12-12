const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;


const router = express.Router();

router.post('/register', (req,res) => {
    userManager.createUser(req.body.userData, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(403).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(401).send('Internal Server Error')
            } else if (err.code == 'auth/operation-not-allowed') {
                return res.status(405).send(err.code)
            } else if (err.code == 'auth/uid-already-exists' || err.code == 'auth/invalid-email' || err.code == 'auth/email-already-exists' || err.code == 'auth/weak-password') {
                return res.status(409).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(201).send('user created')
        }
    })
})

router.put('/update', (req,res) => {
    userManager.updateUser(req.body.uid, req.body.userData, function(user, err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(401).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/uid-already-exists' || err.code == 'auth/invalid-email' || err.code == 'auth/email-already-exists' || err.code == 'auth/operation-not-allowed' || err.code == 'auth/weak-password' || err.code == 'auth/user-not-found') {
                return res.status(409).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send(user)
        }
    })
})

router.delete('/remove', (req,res) => {
    userManager.deleteUser(req.body.uidAdmin, req.body.uid, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(401).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/user-not-found') {
                return res.status(409).send(err.code)
            } else if (err.message == 'Forbidden') {
                return res.status(403).send(err.message)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send('user deleted')
        }
    })
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
