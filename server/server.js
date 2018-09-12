const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mongoose = require('mongoose');
const loadRoutes = require('./routes').loadRoutes
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

loadRoutes(app,'/')
port = 8081

mongoose.connect('mongodb://localhost:27017/JEED');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection with mongo succeeded");
});
console.log("Server running on port: " + port)
app.listen(process.env.PORT || port)

app.get('/', function (req, res) {
    res.send('Root')
})
app.get('/generateDB', function (req, res) {
})

app.get('*', function (req, res) {
    res.redirect('/')
})
