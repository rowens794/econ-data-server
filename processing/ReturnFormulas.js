
var exports = module.exports = {};

exports.getOneMonthChange = function(values, index, meta){
    valueListLen = values.length - 1;
    period = meta.frequency_short;

    if(period === "M" && index + 2 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+1].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);
        
    }else if(period==="W" && index + 5 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+4].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else if(period==="D" && index + 31 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+30].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else if(period==="Q"){
        change = 0;
        return (change * 100).toFixed(2);

    }else{
        return 0;
    }
}

exports.getThreeMonthChange = function(values, index, meta){
    valueListLen = values.length - 1;
    period = meta.frequency_short;

    if(period === "M" && index + 4 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+3].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);
        
    }else if(period==="W" && index + 13 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+12].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else if(period==="D" && index + 91 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+90].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else if(period==="Q" && index + 2 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+1].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else{
        return 0;
    }
}

exports.getTwelveMonthChange = function(values, index, meta){
    valueListLen = values.length - 1;
    period = meta.frequency_short;

    if(period === "M" && index + 13 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+12].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);
        
    }else if(period==="W" && index + 53 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+52].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else if(period==="D" && index + 366 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+365].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else if(period==="Q" && index + 5 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+4].value;
        change = (currentVal - historicVal) / historicVal
        return (change * 100).toFixed(2);

    }else{
        return 0;
    }
}

exports.getTwoYearChange = function(values, index, meta){
    valueListLen = values.length - 1;
    period = meta.frequency_short;

    if(period === "M" && index + 25 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+24].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/2) - 1
        return (change * 100).toFixed(2);
        
    }else if(period==="W" && index + 105 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+104].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/2) - 1
        return (change * 100).toFixed(2);

    }else if(period==="D" && index + 731 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+730].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/2) - 1
        return (change * 100).toFixed(2);

    }else if(period==="Q" && index + 9 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+8].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/2) - 1
        return (change * 100).toFixed(2);

    }else{
        return 0;
    }
}

exports.getThreeYearChange = function(values, index, meta){
    valueListLen = values.length - 1;
    period = meta.frequency_short;

    if(period === "M" && index + 37 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+36].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/3) - 1
        return (change * 100).toFixed(2);
        
    }else if(period==="W" && index + 157 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+156].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/3) - 1
        return (change * 100).toFixed(2);

    }else if(period==="D" && index + 1096 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+1095].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/3) - 1
        return (change * 100).toFixed(2);

    }else if(period==="Q" && index + 13 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+12].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/3) - 1
        return (change * 100).toFixed(2);

    }else{
        return 0;
    }
}

exports.getFiveYearChange = function(values, index, meta){
    valueListLen = values.length - 1;
    period = meta.frequency_short;

    if(period === "M" && index + 61 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+60].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/5) - 1
        return (change * 100).toFixed(2);
        
    }else if(period==="W" && index + 261 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+260].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/5) - 1
        return (change * 100).toFixed(2);

    }else if(period==="D" && index + 1826 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+1825].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/5) - 1
        return (change * 100).toFixed(2);

    }else if(period==="Q" && index + 21 < valueListLen){
        currentVal = values[index].value;
        historicVal = values[index+20].value;
        change = (1 + (currentVal - historicVal) / historicVal) ** (1/5) - 1
        return (change * 100).toFixed(2);

    }else{
        return 0;
    }
}

// exports.getFiveYearChange = function(id, oneM, threeM, oneY, twoY, threeY, fiveY){
//     const EXPANDERS = ['AWHMAN','ICSA','ACDGNO','AMTMNO','UNXANO','PERMIT','M1109BUSM293NNBR','T10Y3M','UMCSENT','PAYEMS','DSPIC96','INDPRO','CMRMTSPL','UEMPMEAN','ISRATIO','ULCNFB','MPRIME','TOTCI','TDSP','CUSR0000SAS','USSLIND','CPIAUCSL','GDPC1']

//     //test if time series expands when improving
//     if(EXPANDERS.indexOf(id) > -1){
//         console.log(expander)


//     }else{ //series contracts when improving

//     }

// }


