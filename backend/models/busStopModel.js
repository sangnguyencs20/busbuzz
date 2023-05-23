const mongoose = require('mongoose');
const BusStopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    address : {
        type: String,
        required: [true, 'Please enter an address'],
    },
    latitude:{
        type: Number,
    },
    longitude:{
        type: Number,
    },
    address:{
        type: String,
        required: [true, 'Please enter a description'],
    }
})

module.exports = mongoose.model('BusStop', BusStopSchema);