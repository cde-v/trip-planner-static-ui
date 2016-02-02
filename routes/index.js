var express = require('express');
var router = express.Router(); 
var Bluebird = require('bluebird');
var models = require('../models'); 
var Hotel = models.Hotel; 
var Restaurant = models.Restaurant; 
var Activity = models.Activity; 


router.get('/', function(req, res, next){
  Bluebird.all([
    Hotel.find({}),
    Restaurant.find({}), 
    Activity.find({})
  ])
  .spread(function(hotels, restaurants, activities){
    res.render('index', {
      hotels: hotels,
      restaurants: restaurants,
      activities: activities
    });
  })
  .then(null, next);
});

module.exports = router; 