var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    name: String,
    status: Boolean,
    description: String,
    startDate: Date,
    finalDate: Date,
})

var Equi = mongoose.model('Equi',Schema,'equipments');
module.exports = Equi;

module.exports.addEquipment = function (evnt, callback){
    Equi.create(evnt, callback);
}

module.exports.getAllEquipments = function (callback){
    Equi.find(callback)
}