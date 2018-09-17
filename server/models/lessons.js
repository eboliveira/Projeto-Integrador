var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lesson_calendar = new Schema({
  room: String,       //Exemplo: B001, B002
  type_room: String,  //Exemplo: Laboratório, sala de aula comum
  capacity : Number,  //Capacidade da sala, pode ser vazio
  schedule: String,   //horários, Exemplo: m1, m2, n1, n2
  discipline_cod : String,  //código da disciplina
  class_cod : String,       //código da turma
  discipline_name : String, //nome da disciplina
  responsable : String //nome do professor ou quem requisitou a sala
  })


var Lesson = mongoose.model('Lesson',Lesson_calendar,'lesson');
module.exports = Lesson;

module.exports.addLesson = function (evnt, callback){
  Lesson.create(evnt, callback);
}

module.exports.getAllLessons = function (callback){
  Lesson.find(callback)
}

module.exports.getLessonById = function (id, callback){
  Lesson.findOne({
    _id : id
  }, callback)
}

module.exports.updateLesson = function (updateLesson, callback){
  Lesson.getLessonById(updateLesson.id,(err, lesson) =>{
    if (lesson) {
      lesson.description = (updateLesson.description && updateLesson.description != lesson.description) ? updateLesson.description : lesson.description
      lesson.title = (updateLesson.title && updateLesson.title != lesson.title) ? updateLesson.title : lesson.title
      lesson.startDate = (updateLesson.startDate && updateLesson.startDate != lesson.startDate) ? updateLesson.startDate : lesson.startDate
      lesson.finalDate = (updateLesson.finalDate && updateLesson.finalDate != lesson.finalDate) ? updateLesson.finalDate : lesson.finalDate
      lesson.responsable = (updateLesson.responsable && updateLesson.responsable != lesson.responsable) ? updateLesson.responsable : lesson.responsable
      lesson.status = (updateLesson.status && updateLesson.status != lesson.status) ? updateLesson.status : lesson.status
      lesson.save(callback)
  } else {
      callback(true, null)
  }
  })
}