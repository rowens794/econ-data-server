const shortNames = require('./ManualData');
const SmallPack = require("../models/SmallPack");

exports.AggAndSave = function (processedObject, rawData) {

    const DATA_POINTS = ['AWHMAN','ICSA','ACDGNO','AMTMNO','UNXANO','PERMIT','M1109BUSM293NNBR','T10Y3M','UMCSENT','PAYEMS','DSPIC96','INDPRO','CMRMTSPL','UEMPMEAN','ISRATIO','ULCNFB','MPRIME','TOTCI','TDSP','CUSR0000SAS','USSLIND','CPIAUCSL','GDPC1']


    //create a small package of data to be downloaded immediately on page load
    //console.log(processedObject);
    smallPack = {
        chartData: [],
        indicators: {}
    };

    for (i=0; i<processedObject.length; i++){
        smallPack.chartData.push({
            date: processedObject[i].date,
            leading: processedObject[i].leadingValue,
            coincident: processedObject[i].coincidentValue,
            lagging: processedObject[i].laggingValue,
        })
    }
    

    //console.log(rawData);
    keys = Object.keys(processedObject[0]);
    

    for (i=0; i<keys.length; i++){
        if(DATA_POINTS.indexOf(keys[i]) != -1){
            index = DATA_POINTS.indexOf(keys[i])

            smallPack.indicators[keys[i]] = {
                shortName: shortNames.shortNames[keys[i]],
                value: processedObject[0][keys[i]].seriesValue,
                oneMonthChange: processedObject[0][keys[i]].oneMonth,
                threeMonthChange: processedObject[0][keys[i]].threeMonth,
                lastUpdate: rawData[index].last_updated
            }
        }
    }

    SmallPack.findOneAndUpdate({_id: '5bbb5a38d69578b1f4ee1702'}, smallPack, function (err){
        if (err) {
            console.log("---------ERROR SAVING DATA---------");
            console.log(err);
        }
        console.log('Data Stored successfully')
    })

}