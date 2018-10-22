const manualData = require('./ManualData');
const SmallPack = require("../models/SmallPack");


exports.AggAndSave = function (processedObject, rawData) {

    const ConstantData = require('../processing/ConstantData');
    const DATA_POINTS = ConstantData.indicators;

    //create a small package of data to be downloaded immediately on page load
    smallPack = {
        lastUpdate: Date.now(),
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
                key: keys[i],
                shortName: manualData.shortNames[keys[i]],
                value: processedObject[0][keys[i]].seriesValue,
                oneMonthChange: processedObject[0][keys[i]].oneMonth,
                threeMonthChange: processedObject[0][keys[i]].threeMonth,
                lastUpdate: rawData[index].last_updated,
                lastChecked: new Date(Date.now()),
                lastReading: processedObject[0][keys[i]].reading
            }
        }
    }
    
    const smallPackData = new SmallPack(smallPack);

    SmallPack.findOneAndDelete({}, function(err){
        if (err) console.log('error deleting previous doc')
        else {
            console.log('previous document deleted')
            smallPackData.save(smallPack, function(err){
                if (err) console.log('error')
                else console.log("new document saved successfully")
            })}
    })
}