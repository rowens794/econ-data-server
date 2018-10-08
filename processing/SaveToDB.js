const Data = require("../models/SmallPack");
const mongoose = require('mongoose');
require('dotenv').config({path: 'vars.env'});

let dev_db_url = process.env.dev_db_url;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
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