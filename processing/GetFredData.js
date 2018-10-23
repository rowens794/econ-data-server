var Fred = require('fred-api');
var axios = require('axios');
var Returns = require("./ReturnFormulas");
require('dotenv').config({path: 'vars.env'});



//var SaveToDB = require('./SaveToDB');

apiKey = process.env.Fred_API_Key;
fred   = new Fred(apiKey);

async function getFedData(SeriesID) {
    metaUrl = `https://api.stlouisfed.org/fred/series?series_id=${SeriesID}&api_key=${apiKey}&file_type=json`;
    seriesURL =`https://api.stlouisfed.org/fred/series/observations?series_id=${SeriesID}&api_key=${apiKey}&file_type=json`;

    metaData = await axios.get(metaUrl).then(response => {
        returnObject = response.data.seriess[0];
        return returnObject
    }).catch((err) => console.log(err));;

    seriesData = await axios.get(seriesURL).then(response => {
        returnArray = response.data.observations;
        //process index changes
        returnArray = returnArray.reverse();  //reverse the index order
        finalArray = [];
        for (i=0; i<returnArray.length; i++){
            date = new Date(returnArray[i].date);
            value = returnArray[i].value;
            oneMonthChange = Returns.getOneMonthChange(returnArray, i, metaData);
            threeMonthChange = Returns.getThreeMonthChange(returnArray, i, metaData);
            twelveMonthChange = Returns.getTwelveMonthChange(returnArray, i, metaData);
            twoYearChange = Returns.getTwoYearChange(returnArray, i, metaData);
            threeYearChange = Returns.getThreeYearChange(returnArray, i, metaData);
            fiveYearChange = Returns.getFiveYearChange(returnArray, i, metaData);
    
            finalArray.push(
                {   date:date, 
                    value: value, 
                    oneMonthChange:oneMonthChange, 
                    threeMonthChange:threeMonthChange, 
                    twelveMonthChange:twelveMonthChange,
                    twoYearChange:twoYearChange,
                    threeYearChange:threeYearChange,
                    fiveYearChange:fiveYearChange
                })
        }

        return finalArray
    }).catch((err) => console.log(err));;
    
    mergedObj = {...metaData, data: seriesData}
    return mergedObj;
}

module.exports = getFedData;