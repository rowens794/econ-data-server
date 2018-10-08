const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let DataSchema = new Schema({
    'chartData': Schema.Types.Mixed,
    'indicators': Schema.Types.Mixed
});


// Export the model
module.exports = mongoose.model('SmallPack', DataSchema);