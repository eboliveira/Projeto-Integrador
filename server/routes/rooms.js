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

router.post('/free/:startDate/:finalDate', (req, res) => {
  Rooms.getFree(req.body.schedule, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.post('/:roomType/free/:startDate/:finalDate', (req, res) => {
  Rooms.getFreeByType(req.body.schedule, req.params.roomType, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/:room', (req, res) => {
  Rooms.getById(req.params.room, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/schedule/:room/:startDate/:finalDate', (req, res) => {
  Rooms.getScheduleByRoom(req.params.room, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/schedule/type/:roomType/:startDate/:finalDate', (req, res) => {
  Rooms.getScheduleByRoomType(req.params.roomType, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.put('/set', (req, res) => {
  Rooms.updateOrCreate(req.body.room, function (err, evnt){
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
