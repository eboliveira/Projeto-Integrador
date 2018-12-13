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

router.put('/set', (req, res) => {
    Equipments.updateOrCreate(req.body.equipment, function (err, evnt){
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        else{
            res.status(200).send(evnt);
        }
    })
})

router.delete('/:id', (req,res) =>{
    Equipments.delete(req.params.codigo,(err, evnt) =>{
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        else{
            res.status(200).send(evnt);
        }
    })
})

router.post("/reserve", (req, res) =>{
    Equipments.reserve(req.body, (err,resp) =>{
        if(err) res.status(500).send(err)
        res.status(200).send(resp)
    })
})

router.get("/accept/:patrimonio", (req,res) =>{
    Equipments.accept(req.params.patrimonio, (err,resp) =>{
        if(err) res.status(500).send(err)
        res.status(200).send(resp)
    })
})

router.get("/reject/:patrimonio", (req,res) =>{
    Equipments.accept(req.params.patrimonio, (err,resp) =>{
        if(err) res.status(500).send(err)
        res.status(200).send(resp)
    })
})

module.exports = {
    path : '/equipments',
    router: router
}