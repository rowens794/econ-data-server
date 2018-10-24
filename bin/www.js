//Gather models and initial packages
const express = require("express");
require('dotenv').config({path: 'vars.env'});
app = express();
const Data = require("../models/SmallPack");
const Indicators = require("../models/Indicators");
const gatherData = require("../processing/GatherData");

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://rowens:Presario1@ds121183.mlab.com:21183/econdata';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//run gather data on application start
//gatherData()

app.get('/', function (req, res) {
  Data.find({}, function(err, docs){
    if (err) res.send('error fetching data');
    else {
      //allow cors
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(docs[0]);
    }
  })
})

app.get('/update', function (req, res) {
  //run gather data on url hit
  gatherData();
  res.send('updating database');
});

app.get('/:symbol', function (req, res) {
  Indicators.find({IndicatorSymbol: req.params.symbol}, function(err, docs){
    if (err) res.send('error fetching data');
    else {
      //allow cors
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(docs[0]);
    }
  });
});


var port = process.env.PORT || 8080
app.listen(port);

module.exports = gatherData