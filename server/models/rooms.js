var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room_schema = new Schema({
  _id: String,       //Exemplo: B001, B002
  type_room: String,  //Exemplo: Laboratório, sala de aula comum
  capacity : Number,  //Capacidade da sala, pode ser vazio
}, { versionKey: false })


var Room = mongoose.model('Room', Room_schema, 'room');
module.exports = Room;

module.exports.updateOrCreate = function(evnt, callback){
  Room.findOneAndUpdate(
    { _id:evnt._id },
    {
      $setOnInsert:
      {
        _id:evnt._id
      },
      $set:
      {
        type_room:evnt.type_room,
        capacity:evnt.capacity
      }
    },
    {
      upsert: true,
      new: true
    },
    callback
  )
}

module.exports.all = function (callback){
  Room.find(callback).sort({_id:'asc'})
}

// module.exports.getFree = function (schedule, callback){
//   Room.aggregate([
//     {
//       $lookup: {
//         from: "lesson",
//         let: { class_room: "$_id" },
//         pipeline:[
//           {
//             $match:{
//               $expr:{
//                 $eq:["$$class_room", "$room"]
//               }
//             }
//           },
//           { $project: { schedule:true, _id:false } }
//         ],
//         as: "Lessons"
//       }
//     },
//     {
//       $lookup: {
//         from: "events",
//         let: { class_room: "$_id" },
//         pipeline:[
//           {
//             $match:{
//               $expr:{
//                 $eq:["$$class_room", "$room"]
//               }
//             }
//           },
//           { $project: { schedule:true, _id:false } }
//         ],
//         as: "Events"
//       }
//     },
//     {
//       "$match": {$and:[
//         {"Lessons.schedule": {$not:{$in:schedule}}},
//         {"Events.schedule": {$not:{$in:schedule}}}
//       ]}
//     },
//     { "$sort": {_id: 1 } }
//   ], callback)
// }

// Free rooms at schedule
module.exports.getFreeByType = function (schedule, roomType, startDate, finalDate, callback){
  Room.aggregate([
    {
      $lookup: {
        from: "lesson",
        let: { class_room: "$_id" },
        pipeline:[
          {
            $match:{
              $expr:{
                $eq:["$$class_room", "$room"]
              }
            }
          },
          { $project: { schedule:true, _id:false } }
        ],
        as: "Lessons"
      }
    },
    {
      $lookup: {
        from: "events",
        let: { class_room: "$_id" },
        pipeline:[
          {
            $match:{
              $expr:{ $and:[
                {$eq:["$$class_room", "$room"]},
              ]
              }
            }
          },
          { $project: { schedule:true, startDate: true, finalDate: true, _id:false } }
        ],
        as: "Events"
      }
    },
    {
      "$match": {$and:[
        {type_room:{$ne:roomType}},
        {"Lessons.schedule": {$not:{$in:schedule}}},
        // {"Events.startDate":{$lte:new Date(finalDate).toISOString()}},
        // {"Events.finalDate":{$gte:new Date(startDate).toISOString()}}
      ]}
    },
    { $project: { Lessons:false, Events:false } },
    { "$sort": {_id: 1 } }
  ], callback)
}

module.exports.getById = function (id, callback){
  Room.findOne({
    _id : id
  }, callback)
}
