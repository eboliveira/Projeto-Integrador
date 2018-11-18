const userManager = require('../admin/userManager')
const express = require('express')
const User = require('../models/users')


const router = express.Router();

router.get('/', (req, res) => {
    res.send("teste")
})

router.post('/register', (req,res) => {
    userManager.createUser(req.body.userData, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(401).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/uid-already-exists' || err.code == 'auth/invalid-email' || err.code == 'auth/email-already-exists' || err.code == 'auth/operation-not-allowed' || err.code == 'auth/weak-password') {
                return res.status(409).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(201).send('user created')
        }
    })
})

router.put('/update', (req,res) => {
    userManager.updateUser(req.body.uid, req.body.userData, function(user, err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(401).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/uid-already-exists' || err.code == 'auth/invalid-email' || err.code == 'auth/email-already-exists' || err.code == 'auth/operation-not-allowed' || err.code == 'auth/weak-password' || err.code == 'auth/user-not-found') {
                return res.status(409).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send(user)
        }
    })
})

router.delete('/remove', (req,res) => {
    userManager.deleteUser(req.body.uid, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(401).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/user-not-found') {
                return res.status(409).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send('user deleted')
        }
    })
})

router.post('/isAdmin', (req,res) => {
    userManager.isAdmin(req.body.uid, function(isAdmin, err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/user-not-found'){
                return res.status(409).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request: ' + err.message)
            }
        } else {
            return res.status(200).send(isAdmin)
        }
    })
})

router.post('/setRole', (req,res) => {
    userManager.setCustomUserClaims(req.body.uidAdmin, req.body.uid, req.body.role, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/user-not-found'){
                return res.status(409).send(err.code)
            } else if (err.message == 'Forbidden') {
                return res.status(403).send(err.message)
            }else {
                return res.status(400).send('server could not understand the request: ' + err.message)
            }
        } else {
            return res.status(200).send('Role updated')
        }
    })
})

router.post('/all', (req,res) => {
    userManager.allUsers(req.body.uid, function(users, err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.code == 'app/invalid-credential' || err.code == 'auth/maximum-user-count-exceeded' || err.code == 'auth/invalid-page-token') {
                return res.status(500).send('Internal Server Error: ' + err.code)
            } else if (err.message == 'Forbidden'){
                return res.status(403).send(err.message)
            } else {
                return res.status(400).send('server could not understand the request: ' + err.message)
            }
        } else {
            return res.status(200).send(users)
        }
    })
})

module.exports = {
    path: '/users',
    router: router
}
