const Data = require("../models/SmallPack");

var exports = module.exports = {};

exports.SaveData = function (object) {
    console.log("************Saving to DB****************")
    let data = new Data(object);
  
    data.save(function (err) {
        if (err) {
            console.log("---------ERROR SAVING DATA---------");
            console.log(err);
        }
        console.log('Data Stored successfully')
    })
}