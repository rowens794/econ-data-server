const manualData = require('./ManualData');
const Indicators = require("../models/Indicators");

exports.BuildIndicatorAndSave = function (rawData, summaryData) {

    LEADING_INDICATORS = ['AWHMAN','ICSA','ACDGNO','AMTMNO','UNXANO','PERMIT','M1109BUSM293NNBR','T10Y3M','UMCSENT'];
    COINCIDENT_INDICATORS = ['PAYEMS','DSPIC96','INDPRO','CMRMTSPL'];
    LAGGING_INDICATORS = ['UEMPMEAN','ISRATIO','ULCNFB','MPRIME','TOTCI','TDSP','CUSR0000SAS'];
    OTHER_INDICATORS = ['USSLIND','CPIAUCSL','GDPC1']
    RISING_INDICATORS = ['AWHMAN','ACDGNO','AMTMNO','UNXANO','PERMIT','M1109BUSM293NNBR','T10Y3M','UMCSENT','PAYEMS','DSPIC96','INDPRO','CMRMTSPL','ULCNFB','MPRIME','TOTCI','USSLIND','CPIAUCSL','GDPC1'];

    //identify indicator type
    let indicatorType = ''
    if(LEADING_INDICATORS.indexOf(rawData.id)){
        indicatorType = 'Leading'
    }else if (COINCIDENT_INDICATORS.indexOf(rawData.id)){
        indicatorType = 'Coincident'
    }else if (COINCIDENT_INDICATORS.indexOf(rawData.id)){
        indicatorType = 'Lagging'
    }else{
        indicatorType = ''
    }

    //identify positive indicator direction
    let positiveIndicatorDirection = '';
    if(RISING_INDICATORS.indexOf(rawData.id)){
        positiveIndicatorDirection = 'positive'
    }else{
        positiveIndicatorDirection = 'negative'
    }

    //create a small package of data to be downloaded immediately on page load
    indicatorData = {
        IndicatorSymbol: rawData.id,
        IndicatorType: indicatorType,
        PositiveIndicatorDirection: positiveIndicatorDirection,
        IndicatorName: rawData.title, 
        IndicatorShortName: manualData.shortNames[rawData.id],
        LastUpdated: rawData.last_updated,
        FREDDescription: rawData.notes,
        SummaryDescription: '',
        ActualsData: rawData.data,
        Units: rawData.units,
        ThreeMonthChange: summaryData[0][rawData.id].threeMonth,
        OneYearChange: summaryData[0][rawData.id].twelveMonth,
        ThreeYearChange: summaryData[0][rawData.id].threeYear,
        FiveYearChange: summaryData[0][rawData.id].fiveYear,
        Frequency: rawData.frequency,
        FrequencyShort: rawData.frequency_short,
    };


    const indicator = new Indicators(indicatorData);
    

    //Function to establish initial data population
    // indicator.save(indicatorData, function(err){
    //     if (err) console.log('error saving indicator data');
    //     else console.log(`indicator data for ${rawData.id} saved successfully`);
    // })


    Indicators.findOneAndUpdate({IndicatorSymbol: rawData.id}, indicatorData, function(err){
        if (err) {
            console.log(`indicator data for ${rawData.id} failed to update`);
        }
        else {
            console.log(`indicator data for ${rawData.id} updated successfully`);
        }
    })
}