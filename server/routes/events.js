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

router.post('/postEvent', (req, res) =>{
  let new_event = {}
  new_event.title = req.body.title;
  new_event.description = req.body.description;
  new_event.startDate = req.body.startDate;
  new_event.finalDate = req.body.finalDate;
  EventCalendar.addEvent(new_event, function (err, evnt) {
    if (err) {
        console.log(err)
        return res.status(400).send('server could not understand the request')
    }
    res.status(201).json(evnt)
  })
})

module.exports = {
  path : '/event',
  router: router
}
  

