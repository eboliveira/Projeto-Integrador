const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mongoose = require('mongoose');
const loadRoutes = require('./routes').loadRoutes
const app = express()
const fs = require('fs')
const model = require('./models/lessons')


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
function format_csv(csv){
    csv = csv.split("\n");
    csv.forEach(item => {
        formated_item = item.split(";").map(function(val){
            return val
        });
        let new_lesson = {}
        new_lesson.room = formated_item[0];
        new_lesson.type_room = formated_item[1];
        new_lesson.capacity = formated_item[2];
        new_lesson.schedule = [formated_item[3]];
        new_lesson.discipline_cod = formated_item[4];
        new_lesson.class_cod = formated_item[5];
        new_lesson.discipline_name = formated_item[6];
        new_lesson.responsable = formated_item[7];
        model.addLesson(new_lesson, function(err,evnt){
            if (err){
                console.log(err);
            }
        });
    });
}
console.log("Server running on port: " + port)
app.listen(process.env.PORT || port)

app.get('/', function (req, res) {
    res.status(200).send('Root')
})
app.get('/generateDB', function (req, res) {
    fs.readFile('resources/horarios-2018-2.csv', 'utf8', (err, csv) =>{
        format_csv(csv)
    })
    res.status(201).json("Database generated")
})

app.get('*', function (req, res) {
    res.redirect('/')
})
