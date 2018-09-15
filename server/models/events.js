var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventCalendar = new Schema({
    title: String,    //Exemplo: Aula, Reunião, Palestra, Minicurso
    description: [String],  //Exemplo: Código da disciplina, Código da turma, Nome da aula, Nome da palestra
    room: String,       //Exemplo: B001, B002
    type_room: String,  //Exemplo: Laboratório, sala de aula comum
    startDate: Date,    //Dia de inicio do evento, para eventos com mais de um dia
    finalDate: Date,    //Dia do final do evento, para eventos com mais de um dia
    schedule: [String],   //horários, Exemplo: m1, m2, n1, n2
    responsable : String, //nome do professor ou quem requisitou a sala
    status : Number     //status de aprovação
  })


var Evnt = mongoose.model('Evnt',EventCalendar,'events');
module.exports = Evnt;

module.exports.addEvent = function (evnt, callback){
  Evnt.create(evnt, callback);
}

module.exports.getAllEvents = function (callback){
  Evnt.find(callback)
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