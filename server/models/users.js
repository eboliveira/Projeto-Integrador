var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type:String, unique: true},
    password: String
})


var User = mongoose.model('User',UserSchema,'users');
module.exports = User;

module.exports.addUser = function (user, callback){
  User.create(user, callback);
}