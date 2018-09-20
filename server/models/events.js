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
  Evnt.find({$and:[{startDate:{$lte:new Date(finalDate).toISOString()}}, {finalDate:{$gte:new Date(startDate).toISOString()}}]}, callback)
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
