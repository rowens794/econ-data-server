const Moment = require('moment');
const GetFredData = require("../processing/GetFredData");
const SummarySeriesCalc = require("../processing/SummarySeriesCalc");
const Agg = require("../processing/DataAggregator");
const IndicatorSave = require("../processing/IndicatorSave");


const gatherData = async function() {

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
        console.log('STEP 1: Promises Collected. Length: ' + data.length)
        return data;
    }).catch((err) => console.log('error waiting for promises to resolve'));
  
    //create a monthly structure to store data points
    let monthlyStructure = [];
    let startDate = Moment();
  
    while (startDate > Moment('01/01/1992', "MM-DD-YYYY")) {
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

module.exports = gatherData