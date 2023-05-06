const mongoose = require('mongoose');
const BusStopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    coordinate: {
        type: [mongoose.Schema.Types.Number],
        required: [true, 'Please enter a coordinate'],
    }
})

module.exports = mongoose.model('BusStop', BusStopSchema);