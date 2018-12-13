const express = require('express')
const mongoose = require('mongoose');
const EventCalendar = require('../models/events')
const router = express.Router();
const moment = require('moment')

mongoose.connect('mongodb://localhost:27017/JEED');
var db = mongoose.connection;


router.get('/all', (req, res) => {
  EventCalendar.getAllEvents(function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.put('/status/:id',(req, res) => {
    EventCalendar.updateStatus(req.params.id, req.body.status, function (err, evnt){
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        else{
            res.status(200).send(evnt);
        }
    })
})

router.get('/status/:status', (req, res) => {
  EventCalendar.getEventsByStatus(req.params.status, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/status/:status/:startDate/:finalDate', (req, res) => {
  EventCalendar.getEventsByStatusAtInterval(req.params.status, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/responsable/:responsable', (req, res) => {
  EventCalendar.getEventsByResponsable(req.params.responsable, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/responsable/:responsable/:startDate/:finalDate', (req, res) => {
  EventCalendar.getEventsByResponsableAtInterval(req.params.responsable, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/room/:room', (req, res) => {
  EventCalendar.getEventsAtRoom(req.params.room, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.post('/room/:room', (req, res) => {
  EventCalendar.getEventsAtRoomAtSchedule(req.params.room, req.body.schedule, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/room/:room/:startDate/:finalDate', (req, res) => {
  EventCalendar.getEventsAtRoomAtInterval(req.params.room, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.post('/room/:room/:startDate/:finalDate', (req, res) => {
  EventCalendar.getEventsAtRoomAtScheduleAtInterval(req.params.room, req.body.schedule, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/atInterval/:startDate/:finalDate', (req, res) => {
  EventCalendar.getEventsAtInterval(req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.post('/atScheduleAtIntertal/:startDate/:finalDate', (req, res) => {
  EventCalendar.getEventsByScheduleAtInterval(req.body.schedule, req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})

router.get('/:id', (req, res) => {
  EventCalendar.getEventById(req.params.id, function (err, evnt){
    if(err){
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    else{
      res.status(200).send(evnt);
    }
  })
})


router.post('/post', (req, res) =>{
  let new_event = {}
  new_event.title = req.body.title;
  new_event.user = req.body.user;
  new_event.description = req.body.description;
  new_event.room = req.body.room.toUpperCase();
  new_event.startDate = req.body.startDate;
  new_event.finalDate = req.body.finalDate;
  new_event.responsable = req.body.responsable;
  new_event.repeat = req.body.repeat;
  new_event.status = req.body.status;
  new_event.timestamp = moment().subtract(3, 'hours').format()
  EventCalendar.addEvent(new_event, function (err, evnt) {
    if (err) {
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    res.status(201).json(evnt)
  })
})

router.put('/:id', (req, res) => {
  let updatedEvent = {}
  updatedEvent.title = req.body.title
  updatedEvent.description = req.body.description
  updatedEvent.responsable = req.body.responsable
  updatedEvent.startDate = req.body.startDate
  updatedEvent.finalDate = req.body.finalDate
  updatedEvent.status = req.body.status
  updatedEvent.id = req.params.id
  EventCalendar.updateEvent(updatedEvent, function (err, todo) {
    if (err) {
      console.log(err)
      return res.status(400).send('server could not understand the request')
    }
    res.status(200).json(todo)
  })
})

module.exports = {
  path : '/events',
  router: router
}
