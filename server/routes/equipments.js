const express = require('express')
const mongoose = require('mongoose');
const Equipments = require('../models/equipments')

const router = express.Router();

router.get('/all', (req, res) => {
    Equipments.getAllEquipments(function (err, evnt) {
        if (err) {
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        else {
            res.status(200).send(evnt);
        }
    })
})

router.put('/:id', (req, res) => {
    let updatedEquipments = {}
    updatedEquipments.patrimonio = req.body.title
    updatedEquipments.npme       = req.body.description
    updatedEquipments.marca      = req.body.responsable
    updatedEquipments.modelo     = req.body.startDate
    updatedEquipments.id         = req.params.id
    
    Equipments.updateEvent(updatedEquipments, function (err, todo) {
        if (err) {
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(200).json(todo)
    })
})

module.exports = {
    path : '/equipments',
    router: router
}