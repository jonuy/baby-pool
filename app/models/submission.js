var mongoose = require('mongoose')
    ;

var uri = 'mongodb://localhost/baby_pool';
var db = mongoose.createConnection(uri);

var schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  birthdate: Date,
  weight_lbs: Number,
  weight_oz: Number,
  height_inches: Number,
  hair: Boolean,
});

var model = db.model('submission', schema);

module.exports = model;