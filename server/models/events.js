var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventCalendar = new Schema({
  title: String,
  description: String,
  room: String,
  type_room: String,
  startDate: Date,
  finalDate: Date,
  schedule: [String],
  responsable : String,
  status : String
})


var Evnt = mongoose.model('Evnt',EventCalendar,'events');
module.exports = Evnt;

module.exports.addEvent = function (evnt, callback){
  Evnt.create(evnt, callback);
}

module.exports.getAllEvents = function (callback){
  Evnt.find(callback)
}

module.exports.getEventsAtInterval = function (startDate, finalDate, callback){
  Evnt.find(
    {$and:[
      {startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}}
    ]}, callback
  )
}

module.exports.getEventsAtRoom = function (roomSearch, callback){
  Evnt.find({room: roomSearch}, callback)
}

module.exports.getEventsAtRoomAtSchedule = function (roomSearch, schedule, callback){
  Evnt.find(
    {$and:[
      {room: roomSearch},
      {schedule: {$all:[schedule]}}
    ]}, callback
  )
}

module.exports.getEventsAtRoomAtScheduleAtInterval = function (roomSearch, schedule, startDate, finalDate, callback){
  Evnt.find(
    {$and:[
      {startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {room: roomSearch},
      {schedule: {$all:[schedule]}}
    ]}, callback
  )
}

module.exports.getEventsAtRoomAtInterval = function (roomSearch, startDate, finalDate, callback){
  Evnt.find(
    {$and:[
      {startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {room: roomSearch}
    ]}, callback
  )
}

module.exports.getEventsByRoomType = function (roomType, callback){
  Evnt.find({type_room: roomType}, callback)
}

module.exports.getEventsByRoomTypeAtInterval = function (roomType, startDate, finalDate, callback){
  Evnt.find(
    {$and:[{startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {type_room: roomType}
    ]}, callback
  )
}

module.exports.getFreeEventRoomsAtScheduleAtIntertal = function (schedule, startDate, finalDate, callback){
  Evnt.find(
    {$and:[
      {startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {schedule: {$nin:[schedule]}}
    ]}, callback
  )
}

module.exports.getFreeEventRoomsAtSchedule = function (schedule, callback){
  Evnt.find({schedule: {$nin:[schedule]}}, callback)
}

module.exports.getFreeEventRoomsByTypeAtSchedule = function (roomType, schedule, startDate, finalDate, callback){
  Evnt.find(
    {$and:[
      {startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {type_room: roomType},
      {schedule: {$nin:[schedule]}}
    ]}, callback
  )
}

module.exports.getEventsByScheduleAtInterval = function (schedule, startDate, finalDate, callback){
  Evnt.find(
    {$and:[
      {startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {schedule: {$all:[schedule]}}
    ]}, callback
  )
}

module.exports.getEventsByResponsable = function (responsable, callback){
  Evnt.find({responsable: responsable}, callback)
}

module.exports.getEventsByResponsableAtInterval = function (responsable, startDate, finalDate, callback){
  Evnt.find(
    {$and:[{startDate:{$lte:new Date(finalDate).toISOString()}},
      {finalDate:{$gte:new Date(startDate).toISOString()}},
      {responsable: responsable}
    ]}, callback
  )
}

module.exports.getEventById = function (id, callback){
  Evnt.findOne({
    _id : id
  }, callback)
}

module.exports.updateEvent = function (updateEvent, callback){
  Evnt.getEventById(updateEvent.id,(err, event) =>{
    if (event) {
      event.description = (updateEvent.description && updateEvent.description != event.description) ? updateEvent.description : event.description
      event.title = (updateEvent.title && updateEvent.title != event.title) ? updateEvent.title : event.title
      event.startDate = (updateEvent.startDate && updateEvent.startDate != event.startDate) ? updateEvent.startDate : event.startDate
      event.finalDate = (updateEvent.finalDate && updateEvent.finalDate != event.finalDate) ? updateEvent.finalDate : event.finalDate
      event.responsable = (updateEvent.responsable && updateEvent.responsable != event.responsable) ? updateEvent.responsable : event.responsable
      event.status = (updateEvent.status && updateEvent.status != event.status) ? updateEvent.status : event.status
      event.save(callback)
    } else {
      callback(true, null)
    }
  })
}
