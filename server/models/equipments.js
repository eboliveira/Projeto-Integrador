var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    patrimonio: String,
    nome: String,
    marca: String,
    modelo: String,
    reservasInicio:[String],
    reservasFim:[String],
    status:[String],
    responsavel:[String]
}, { versionKey: false })


var Equi = mongoose.model('Equi',Schema,'equipments');

module.exports = Equi;

module.exports.addEquipment = function (evnt, callback){
    Equi.create(evnt, callback);
}

module.exports.getAllEquipments = function (callback){
    Equi.find(callback)
}

module.exports.getequiById = function (id, callback){
    Equi.findOne({
        _id : id
    }, callback)
}


module.exports.reserve = function(equip, callback){
    Equi.findOne({
        patrimonio:equip.patrimonio
    }).then( (res) =>{
        let equipment = res
        equipment.reservasInicio.push(equip.reservasInicio)
        equipment.reservasFim.push(equip.reservasFim)
        equipment.status.push(equip.status)
        equipment.responsavel.push(equip.responsavel)
        Equi.updateOne({
            patrimonio:equip.patrimonio
        }, equipment,callback)
    })
}

module.exports.accept = function(patrimonio, callback){
    Equi.findOne({
        patrimonio:patrimonio
    }).then( (res) =>{
        let equipment = res
        equipment.status[equipment.status.length-1] = "confirmed"
        Equi.updateOne({
            patrimonio:patrimonio
        }, equipment, callback)
    })
}

module.exports.reject = function(patrimonio, callback){
    Equi.findOne({
        patrimonio:patrimonio
    }).then( (res) =>{
        let equipment = res
        equipment.status[equipment.status.length-1] = "rejected"
        Equi.updateOne({
            patrimonio:patrimonio
        }, equipment, callback)
    })
}


module.exports.updateEqui = function (updateEqui, callback){
    Equi.getequiById(updateEqui.id,(err, equi) =>{
        if (equi) {
            equi.patrimonio = (updateEqui.patrimonio && updateEqui.patrimonio != equi.patrimonio) ? updateEqui.patrimonio : equi.patrimonio
            equi.nome       = (updateEqui.nome       && updateEqui.nome       != equi.nome)       ? updateEqui.nome       : equi.nome
            equi.marca      = (updateEqui.marca      && updateEqui.marca      != equi.marca)      ? updateEqui.marca      : equi.marca
            equi.modelo     = (updateEqui.modelo     && updateEqui.modelo     != equi.modelo)     ? updateEqui.modelo     : equi.modelo
            equi.reservasInicio     = (updateEqui.reservasInicio     && updateEqui.reservasInicio     != equi.reservasInicio)     ? updateEqui.reservasInicio     : equi.reservasInicio
            equi.reservasFim     = (updateEqui.reservasFim     && updateEqui.reservasFim     != equi.reservasFim)     ? updateEqui.reservasFim     : equi.reservasFim
            equi.status     = (updateEqui.status     && updateEqui.status     != equi.status)     ? updateEqui.status     : equi.status
            equi.responsavel     = (updateEqui.responsavel     && updateEqui.responsavel     != equi.responsavel)     ? updateEqui.responsavel     : equi.responsavel
            equi.save(callback)
        } else {
            callback(true, null)
        }
    })
}

module.exports.updateOrCreate = function(evnt, callback){
    Equi.findOneAndUpdate(
      { patrimonio:evnt.patrimonio },
      {
        $set:
        {
          patrimonio:evnt.patrimonio,
          nome:evnt.nome,
          marca:evnt.marca,
          modelo:evnt.modelo,
        }
      },
      {
        upsert: true,
        new: true
      },
      callback
    )
  }

  module.exports.delete = function (codigo, callback){
    Equi.remove({
      codigo : codigo
    }, callback)
  }