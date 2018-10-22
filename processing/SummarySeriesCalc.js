var exports = module.exports = {};

const ConstantData = require('../processing/ConstantData');
const RISING_INDICATORS = ConstantData.rising_indicators;

exports.summaryCalc = function(monthObj, seriesValues){
    console.log('summary series calc running');

    //each series in seriesValues
    for (i=0; i<seriesValues.length; i++){

        //populate the monthObj with appropriote data
        //outer loop controls monthObj inner controls series
        for (j=0; j<monthObj.length; j++){
            monthObj[j][seriesValues[i].id] = {
                oneMonth: 0,
                threeMonth: 0,
                twelveMonth: 0,
                twoYear: 0,
                threeYear: 0,
                fiveYear: 0,
                seriesValue: 0,
                reading: 0
            };

            for (k=0; k < seriesValues[i].data.length; k++){
                //logic to calculate index goes inside for loop below
                if (seriesValues[i].data[k].date <= monthObj[j].date){
                    //console.log(monthObj[j].date+": "+monthObj[j].leadingValue+": "+monthObj[j].coincidentValue+": "+monthObj[j].laggingValue)

                    LEADING_INDICATORS = ConstantData.leading_indicators;
                    COINCIDENT_INDICATORS = ConstantData.coincident_indicators;
                    LAGGING_INDICATORS = ConstantData.lagging_indicators;
                    OTHER_INDICATORS = ConstantData.other_indicators;

                    if (LEADING_INDICATORS.indexOf(seriesValues[i].id) > -1 ){
                        indicatorType = "leadingValue";
                        indicatorLen = LEADING_INDICATORS.length;
                    }else if (COINCIDENT_INDICATORS.indexOf(seriesValues[i].id) > -1 ){
                        indicatorType = "coincidentValue";
                        indicatorLen = COINCIDENT_INDICATORS.length;
                    }else if (LAGGING_INDICATORS.indexOf(seriesValues[i].id) > -1 ){
                        indicatorType = "laggingValue";
                        indicatorLen = LAGGING_INDICATORS.length;
                    }else{
                        indicatorType = "otherValue";
                        indicatorLen = OTHER_INDICATORS.length;
                    }


                    //set baseline data 
                    oneM = seriesValues[i].data[k].oneMonthChange;
                    threeM = seriesValues[i].data[k].threeMonthChange;
                    twelveM  = seriesValues[i].data[k].twelveMonthChange;
                    twoY  = seriesValues[i].data[k].twoYearChange;
                    threeY  = seriesValues[i].data[k].threeYearChange;
                    fiveY  = seriesValues[i].data[k].fiveYearChange;
                    seriesValue = seriesValues[i].data[k].value;

                    monthObj[j][seriesValues[i].id].oneMonth = oneM;
                    monthObj[j][seriesValues[i].id].threeMonth = threeM;
                    monthObj[j][seriesValues[i].id].twelveMonth = twelveM;
                    monthObj[j][seriesValues[i].id].twoYear = twoY;
                    monthObj[j][seriesValues[i].id].threeYear = threeY;
                    monthObj[j][seriesValues[i].id].fiveYear = fiveY;
                    monthObj[j][seriesValues[i].id].seriesValue = seriesValue;


                    //if series is a positively trending series
                    if (RISING_INDICATORS.indexOf(seriesValues[i].id) > -1 ){

                        if(threeM * 4 > twelveM && twelveM > twoY){
                            monthObj[j][indicatorType] += 2 /indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = 2;
                        }else if (twelveM > twoY){
                            monthObj[j][indicatorType] += 1 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = 1;
                        }else if (threeM * 4 < twelveM && twelveM < twoY){
                            monthObj[j][indicatorType] -= 2 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = -2;
                        }
                        else if (twelveM < twoY){
                            monthObj[j][indicatorType] -= 1 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = 1;
                        }

                    //else series is a negatively trending value
                    }else{

                        if(threeM * 4 < twelveM && twelveM < twoY){
                            monthObj[j][indicatorType] += 2 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = 2;
                        }else if (twelveM < twoY){
                            monthObj[j][indicatorType] += 1 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = 1;
                        }else if (threeM * 4 > twelveM && twelveM > twoY){
                            monthObj[j][indicatorType] -= 2 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = -2;
                        }else if (twelveM > twoY){
                            monthObj[j][indicatorType] -= 1 / indicatorLen;
                            monthObj[j][seriesValues[i].id].reading = -1;
                        }
                    }

                    break
                }
            }
        }
    }

    return monthObj;
}



