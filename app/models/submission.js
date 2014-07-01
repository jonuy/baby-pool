var mongoose = require('mongoose')
    ;

// MONGOLAB_URI set by heroku in conjunction with the MongoLab plugin.
// Otherwise, use the one explicitly set for localhost.
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/baby_pool';
var db = mongoose.createConnection(uri);

var schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  contact: String,
  birthdate: Date,
  weight_lbs: Number,
  weight_oz: Number,
  length_inches: Number,
  hair: Boolean,
});

var model = db.model('submission', schema);

module.exports = model;
