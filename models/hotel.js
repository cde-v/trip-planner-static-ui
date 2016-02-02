var mongoose = require('mongoose'); 
var PlaceSchema = require('./place.js').schema;

var HotelSchema = new mongoose.Schema({
  name: String, 
  place: [PlaceSchema], 
  num_stars: {type: Number, min: 1, max: 5}, 
  amenities: [String]
});


module.exports = mongoose.model('Hotel', HotelSchema)
