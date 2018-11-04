var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventCalendar = new Schema({
    title: String,
    description: String,
    room: String,
    startDate: Date,
    finalDate: Date,
    responsable : String,
    status : String,
    repeat : String,
    timestamp: Date
}, { versionKey: false })


var Evnt = mongoose.model('Evnt',EventCalendar,'events');
module.exports = Evnt;

module.exports.addEvent = function (evnt, callback){
    Evnt.create(evnt, callback);
}

module.exports.getAllEvents = function (callback){
    Evnt.find(callback).sort({room:'asc'})
}

module.exports.getEventsAtInterval = function (startDate, finalDate, callback){
    // Evnt.find(
    //   {$and:[
    //     {startDate:{$lte:new Date(finalDate).toISOString()}},
    //     {finalDate:{$gte:new Date(startDate).toISOString()}}
    //   ]}, callback
    // ).sort({startDate:'asc'})
    Evnt.aggregate([
        {$match:
            {$and:[
                {startDate:{$lte:new Date(finalDate)}},
                {finalDate:{$gte:new Date(startDate)}}
            ]}
        },
        {$group:
            {
                _id: "$_id",
                title: {$addToSet: "$title"},
                description: {$addToSet: "$description"},
                responsable: {$addToSet: "$responsable"},
                status: {$addToSet: "$status"},
                room: {$addToSet: "$room"},
                startDate: {$first: "$startDate"},
                finalDate: {$first: "$finalDate"},
                repeat: {$addToSet: "$repeat"},
                timestamp: {$addToSet: "$timestamp"}
            }
        },
        {$sort: {startDate: 1 }}
    ],callback)
}

module.exports.getEventsAtRoom = function (roomSearch, callback){
    Evnt.find({room: roomSearch}, callback).sort({title:'asc'})
}

module.exports.getEventsPendents = function (callback){
    Evnt.find({status: "undefined"}, callback)
}

module.exports.getEventsAtRoomAtSchedule = function (roomSearch, schedule, callback){
    Evnt.find(
        {$and:[
            {room: roomSearch},
            {schedule: {$in:schedule}}
        ]}, callback
    ).sort({title:'asc'})
}

module.exports.getEventsAtRoomAtScheduleAtInterval = function (roomSearch, schedule, startDate, finalDate, callback){
    Evnt.find(
        {$and:[
            {startDate:{$lte:new Date(finalDate).toISOString()}},
            {finalDate:{$gte:new Date(startDate).toISOString()}},
            {room: roomSearch},
            {schedule: {$in:schedule}}
        ]}, callback
    ).sort({title:'asc'})
}

module.exports.getEventsAtRoomAtInterval = function (roomSearch, startDate, finalDate, callback){
    // Evnt.find(
    //     {$and:[
    //         {startDate:{$lte:new Date(finalDate).toISOString()}},
    //         {finalDate:{$gte:new Date(startDate).toISOString()}},
    //         {room: roomSearch}
    //     ]}, callback
    // ).sort({title:'asc'})
    Evnt.aggregate([
        {$match:
            {$and:[
                {startDate:{$lte:new Date(finalDate)}},
                {finalDate:{$gte:new Date(startDate)}},
                {room: roomSearch}
            ]}
        },
        {$group:
            {
                _id: "$_id",
                title: {$addToSet: "$title"},
                description: {$addToSet: "$description"},
                responsable: {$first: "$responsable"},
                status: {$addToSet: "$status"},
                room: {$addToSet: "$room"},
                startDate: {$first: "$startDate"},
                finalDate: {$first: "$finalDate"},
                repeat: {$addToSet: "$repeat"},
                timestamp: {$addToSet: "$timestamp"}
            }
        },
        {$sort: {room: 1 }}
    ], callback)
}

module.exports.getEventsByScheduleAtInterval = function (schedule, startDate, finalDate, callback){
    Evnt.find(
        {$and:[
            {startDate:{$lte:new Date(finalDate).toISOString()}},
            {finalDate:{$gte:new Date(startDate).toISOString()}},
            {schedule: {$in:schedule}}
        ]}, callback
    ).sort({room:'asc'})
}

module.exports.getEventsByResponsable = function (responsable, callback){
    Evnt.find({responsable: new RegExp(responsable, "i")}, callback).sort({responsable:'asc'})
}

module.exports.getEventsByResponsableAtInterval = function (responsable, startDate, finalDate, callback){
    // Evnt.find(
    //   {$and:[{startDate:{$lte:new Date(finalDate).toISOString()}},
    //     {finalDate:{$gte:new Date(startDate).toISOString()}},
    //     {responsable: new RegExp(responsable, "i")}
    //   ]}, callback
    // ).sort({responsable:'asc'})
    Evnt.aggregate([
        {$match:
            {$and:[
                {startDate:{$lte:new Date(finalDate)}},
                {finalDate:{$gte:new Date(startDate)}},
                {responsable: new RegExp(responsable, "i")}
            ]}
        },
        {$group:
            {
                _id: "$responsable",
                title: {$addToSet: "$title"},
                description: {$addToSet: "$description"},
                responsable: {$first: "$responsable"},
                status: {$addToSet: "$status"},
                room: {$addToSet: "$room"},
                startDate: {$first: "$startDate"},
                finalDate: {$first: "$finalDate"},
                repeat: {$addToSet: "$repeat"},
                timestamp: {$addToSet: "$timestamp"}
            }
        },
        {$sort: {responsable: 1 }}
    ], callback)
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
