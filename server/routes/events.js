const express = require('express')
const mongoose = require('mongoose');
const EventCalendar = require('../models/events')

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/JEED');
var db = mongoose.connection;


router.get('/allEvents', (req, res) => {
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

router.get('/eventsAtInterval/:startDate/:finalDate', (req, res) => {
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
router.post('/postEvent', (req, res) =>{
  let new_event = {}
  new_event.title = req.body.title;
  new_event.description = req.body.description;
  new_event.room = req.body.room;
  new_event.type_room = req.body.type_room;
  new_event.startDate = req.body.startDate;
  new_event.finalDate = req.body.finalDate;
  new_event.schedule = req.body.schedule;
  new_event.responsable = req.body.responsable;
  new_event.status = 0;
  EventCalendar.addEvent(new_event, function (err, evnt) {
    if (err) {
        console.log(err)
        return res.status(400).send('server could not understand the request')
    }
    res.status(201).json(evnt)
  })
}
)
router.get('/:id', (req, res) => {
    EventCalendar.getEventById(req.params.id ,function (err, evnt){
      if(err){
        console.log(err)
        return res.status(400).send('server could not understand the request')
      }
      else{
        res.status(200).send(evnt);
      }
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
  path : '/event',
  router: router
}