var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/realblog');

var userSchema = mongoose.Schema({
  username : String,
  password: String,
  email: String,
  number: Number,
  name: String
})
userSchema.plugin(plm);
module.exports = mongoose.model('users',userSchema);
