// index.js
const express = require("express");
const Moment = require('moment');
const GetFredData = require("../processing/GetFredData");
const SummarySeriesCalc = require("../processing/SummarySeriesCalc");
const Agg = require("../processing/DataAggregator");
const IndicatorSave = require("../processing/IndicatorSave");
require('dotenv').config({path: 'vars.env'});
app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://rowens:Presario1@ds121183.mlab.com:21183/econdata';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Data = require("../models/SmallPack");
const Indicators = require("../models/Indicators");

const testFunc = async function() {

  //collect api call promises for the data collection
  const promises = [
    await GetFredData('AWHMAN'),
    await GetFredData('ICSA'),
    await GetFredData('ACDGNO'),
    await GetFredData('AMTMNO'),
    await GetFredData('UNXANO'),
    await GetFredData('PERMIT'),
    await GetFredData('WILL5000INDFC'),
    await GetFredData('T10Y3M'),
    await GetFredData('UMCSENT'),
    await GetFredData('PAYEMS'),
    await GetFredData('DSPIC96'),
    await GetFredData('INDPRO'),
    await GetFredData('CMRMTSPL'),
    await GetFredData('UEMPMEAN'),
    await GetFredData('ISRATIO'),
    await GetFredData('ULCNFB'),
    await GetFredData('MPRIME'),
    await GetFredData('TOTCI'),
    await GetFredData('TDSP'),
    await GetFredData('CUSR0000SAS'),
    await GetFredData('USSLIND'),
    await GetFredData('CPIAUCSL'),
    await GetFredData('GDPC1')
  ]

  //wait until all of the promises resolve
  data = await Promise.all(promises)
    .then(data => {
      return data;
  });

  //create a monthly structure to store data points
  let monthlyStructure = [];
  let startDate = Moment();

  while (startDate > Moment('1/1/1992')) {
    monthlyStructure.push({date: startDate.toDate(), leadingValue: 0, coincidentValue: 0, laggingValue: 0, otherValue:0});
    startDate.subtract(1, 'months');
  }
  
  
  //pass date structure and data into a function to calculate period scores for business cycle
  const summaryData = await SummarySeriesCalc.summaryCalc(monthlyStructure, data);
  
  //parse the finalized object and send to database
  Agg.AggAndSave(summaryData, data);
  

  //get and save individual data series
  for (i=0; i<data.length; i++){
    IndicatorSave.BuildIndicatorAndSave(data[i], summaryData);
  }

};

testFunc()

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

app.get('/:symbol', function (req, res) {
  Indicators.find({IndicatorSymbol: req.params.symbol}, function(err, docs){
    if (err) res.send('error fetching data');
    else {
      //allow cors
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(docs[0]);
    }
  })
})

var port = process.env.PORT || 8080
app.listen(port);

module.exports = testFunc