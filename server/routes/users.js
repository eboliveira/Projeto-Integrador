const express = require('express')
const userManager = require('../admin/userManager')


const router = express.Router();

router.post('/all', (req,res) => {
    userManager.allUsers(req.body.uid, function(users, err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'Forbidden') {
                return res.status(403).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(401).send('Internal Server Error')
            } else if (err.code == 'auth/operation-not-allowed') {
                return res.status(405).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send(users)
        }
    })
})

router.post('/register', (req,res) => {
    userManager.createUser(req.body.userData, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(403).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(401).send('Internal Server Error')
            } else if (err.code == 'auth/operation-not-allowed') {
                return res.status(405).send(err.code)
            } else if (err.code == 'auth/uid-already-exists' || err.code == 'auth/invalid-email' || err.code == 'auth/email-already-exists' || err.code == 'auth/weak-password') {
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

router.post('/isUser', (req,res) => {
    userManager.getUser(req.body.uid, function(hasUser, err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'Forbidden') {
                return res.status(403).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(401).send('Internal Server Error')
            } else if (err.code == 'auth/operation-not-allowed') {
                return res.status(405).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send(hasUser)
        }
    })
})

router.delete('/remove', (req,res) => {
    userManager.deleteUser(req.body.uidAdmin, req.body.uid, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'E-mail domain not authorized') {
                return res.status(401).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(500).send('Internal Server Error')
            } else if (err.code == 'auth/user-not-found') {
                return res.status(409).send(err.code)
            } else if (err.message == 'Forbidden') {
                return res.status(403).send(err.message)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send('user deleted')
        }
    })
})

router.post('/setRole', (req,res) => {
    userManager.setCustomUserClaims(req.body.uidAdmin, req.body.uid, req.body.role, function(err){
        if (err) {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'Forbidden') {
                return res.status(403).send(err.message)
            } else if (err.code == 'app/invalid-credential') {
                return res.status(401).send('Internal Server Error')
            } else if (err.code == 'auth/operation-not-allowed') {
                return res.status(405).send(err.code)
            } else {
                return res.status(400).send('server could not understand the request ' + err.message)
            }
        } else {
            res.status(200).send('role updated')
        }
    })
})

module.exports = {
    path: '/users',
    router: router
}
