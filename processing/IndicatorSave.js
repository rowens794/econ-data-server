const manualData = require('./ManualData');
const Indicators = require("../models/Indicators");

exports.BuildIndicatorAndSave = function (rawData, summaryData) {

    const ConstantData = require('../processing/ConstantData');
    const LEADING_INDICATORS = ConstantData.leading_indicators;
    const COINCIDENT_INDICATORS = ConstantData.coincident_indicators;
    const LAGGING_INDICATORS = ConstantData.lagging_indicators;
    const OTHER_INDICATORS = ConstantData.other_indicators;
    const RISING_INDICATORS = ConstantData.rising_indicators;

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
    if(RISING_INDICATORS.indexOf(rawData.id) > -1){
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

    
    //--------Function to establish initial data population-------
    // const indicator = new Indicators(indicatorData);
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