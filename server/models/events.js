var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventCalendar = new Schema({
    title: String,
    startDate: Date,
    finalDate: Date,
    description: String
  })


var Evnt = mongoose.model('Evnt',EventCalendar,'events');
module.exports = Evnt;

module.exports.addEvent = function (evnt, callback){
  Evnt.create(evnt, callback);
}
module.exports.getAllEvents = function (callback){
  Evnt.find(callback)
}