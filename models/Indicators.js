const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let IndicatorsSchema = new Schema({
    'IndicatorSymbol': String,
    'IndicatorType': String,
    'PositiveIndicatorDirection': String,
    'IndicatorName': String, 
    'IndicatorShortName': String,
    'PositiveIndicatorDirection': String,
    'LastUpdated': Date,
    'FREDDescription': String,
    'SummaryDescription': String,
    'ActualsData': Array,
    'Units': String,
    'ThreeMonthChange': Number,
    'OneYearChange': Number,
    'ThreeYearChange': Number,
    'FiveYearChange': Number,
    'Frequency': String,
    'FrequencyShort': String,
});


// Export the model
module.exports = mongoose.model('Indicators', IndicatorsSchema);