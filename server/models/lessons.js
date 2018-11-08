var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lesson_calendar = new Schema({
    room: String,       //Exemplo: B001, B002
    schedule: [String],   //horários, Exemplo: m1, m2, n1, n2
    discipline_cod : String,  //código da disciplina
    class_cod : String,       //código da turma
    discipline_name : String, //nome da disciplina
    responsable : String //nome do professor ou quem requisitou a sala
}, { versionKey: false })


var Lesson = mongoose.model('Lesson',Lesson_calendar,'lesson');
module.exports = Lesson;

module.exports.add = function (evnt, callback){
    Lesson.create(evnt, callback);
}

module.exports.getAllLessons = function (callback){
    Lesson.find(callback).sort({room:'asc'})
}

module.exports.getLessonsAtRoom = function (roomSearch, callback){
    Lesson.find({room : roomSearch}, callback).sort({discipline_cod:'asc'})
}

module.exports.getLessonsByDisciplineCod = function (discipline_cod, callback){
    Lesson.find({discipline_cod: discipline_cod}, callback).sort({room:'asc'})
}

module.exports.getLessonsByDisciplineName = function (discipline_name, callback){
    Lesson.find({discipline_name: discipline_name}, callback).sort({room:'asc'})
}

module.exports.getLessonsByDisciplineCodAtClassCod = function (discipline_cod, class_cod, callback){
    Lesson.find(
        {$and:[
            {class_cod: class_cod},
            {discipline_cod: discipline_cod}
        ]}, callback
    ).sort({room:'asc'})
}

module.exports.getLessonsByDisciplineNameAtClassCod = function (discipline_name, class_cod, callback){
    Lesson.find(
        {$and:[
            {class_cod: class_cod},
            {discipline_name: discipline_name}
        ]}, callback
    ).sort({room:'asc'})
}

module.exports.getLessonsAtRoomAtSchedule = function (roomSearch, schedule, callback){
    // Lesson.find(
    //     {$and:[
    //         {room: roomSearch},
    //         {schedule: {$in:schedule}}
    //     ]}, callback
    // ).sort({discipline_cod:'asc'})
    Lesson.aggregate([
        {$match:
            {$and:[
                {room: roomSearch},
                {schedule: {$in:schedule}}
            ]}
        },
        {$unwind:"$schedule"},
        {$group:
            {
                _id: "$discipline_cod",
                discipline_name: {$addToSet: "$discipline_name"},
                discipline_cod: {$addToSet: "$discipline_cod"},
                responsable: {$addToSet: "$responsable"},
                schedule: {$addToSet:"$schedule"},
                room: {$addToSet:"$room"}
            }
        },
        {$sort: {_id: 1 }}
    ],callback)
}

module.exports.getLessonsAtSchedule = function (schedule, callback){
    // Lesson.find({schedule: {$in:schedule}}, callback).sort({discipline_cod:'asc'})
    Lesson.aggregate([
        {$match:{schedule: {$in:schedule}}},
        {$unwind:"$schedule"},
        {$group:
            {
                _id: "$discipline_cod",
                discipline_name: {$addToSet: "$discipline_name"},
                discipline_cod: {$addToSet: "$discipline_cod"},
                responsable: {$addToSet: "$responsable"},
                schedule: {$addToSet:"$schedule"},
                room: {$addToSet:"$room"}
            }
        },
        {$sort: {_id: 1 }}
    ],callback)
}

module.exports.getLessonsByResponsable = function (responsable, callback){
    Lesson.find({responsable: new RegExp(responsable, "i")}, callback).sort({responsable:'asc'})
}

module.exports.getLessonsByResponsableAtSchedule = function (responsable, schedule, callback){
    Lesson.aggregate([
        {$match:
            {$and:[
                {responsable: new RegExp(responsable, "i")},
                {schedule: {$in:schedule}}
            ]}
        },
        {$unwind:"$schedule"},
        {$group:
            {
                _id: "$responsable",
                discipline_name: {$addToSet: "$discipline_name"},
                discipline_cod: {$addToSet: "$discipline_cod"},
                responsable: {$addToSet: "$responsable"},
                schedule: {$addToSet:"$schedule"},
                room: {$addToSet:"$room"}
            }
        },
        {$sort: {_id: 1 }}
    ],callback)
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
