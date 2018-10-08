const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let SmallPackSchema = new Schema({
    'lastUpdate': Number, 
    'chartData': Schema.Types.Mixed,
    'indicators': Schema.Types.Mixed
});


// Export the model
module.exports = mongoose.model('SmallPack', SmallPackSchema);