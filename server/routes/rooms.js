const express = require('express')
const mongoose = require('mongoose');
const Rooms = require('../models/rooms')

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/JEED');
var db = mongoose.connection;


router.get('/all', (req, res) => {
  Rooms.all(function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/free', (req, res) => {
  Rooms.getFree(function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

module.exports = {
  path : '/room',
  router: router
}
