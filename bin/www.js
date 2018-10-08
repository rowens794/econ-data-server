// index.js
const cron = require("node-cron");
const express = require("express");
const GetFredData = require("../processing/GetFredData");
const SummarySeriesCalc = require("../processing/SummarySeriesCalc");
const Agg = require("../processing/DataAggregator");
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


//const DATA_POINTS = ['CPIAUCSL']
const DATA_POINTS = ['AWHMAN','ICSA','ACDGNO','AMTMNO','UNXANO','PERMIT','M1109BUSM293NNBR','T10Y3M','UMCSENT','PAYEMS','DSPIC96','INDPRO','CMRMTSPL','UEMPMEAN','ISRATIO','ULCNFB','MPRIME','TOTCI','TDSP','CUSR0000SAS','USSLIND','CPIAUCSL','GDPC1']

//schedule tasks to be run on the server
//cron.schedule("0-59 * * * *", async function() {
const testFunc = async function() {

  //collect api call promises for the data collection
  const promises = [
    await GetFredData('AWHMAN'),
    await GetFredData('ICSA'),
    await  GetFredData('ACDGNO'),
    await GetFredData('AMTMNO'),
    await GetFredData('UNXANO'),
    await GetFredData('PERMIT'),
    await GetFredData('M1109BUSM293NNBR'),
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
  

  //collect a monthly date object that can be used to consolidate data 
  //I use ACDGNO to form the object because of it's monthly frequency and it has shortest start date
  let monthlyStructure = [];
  data[2].data.map(obj => {
    monthlyStructure.push({date: obj.date, leadingValue: 0, coincidentValue: 0, laggingValue: 0, otherValue:0});
  })
  

  //pass date structure and data into a function to calculate period scores for business cycle
  const summaryData = await SummarySeriesCalc.summaryCalc(monthlyStructure, data);
  
  //parse the finalized object and send to database
  Agg.AggAndSave(summaryData, data);

//});
};

testFunc()

app.listen("3128");