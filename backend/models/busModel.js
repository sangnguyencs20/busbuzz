const mongoose = require('mongoose');
const BusSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: [true, 'Please enter a license plate'],
    },
    timeToStart: {
        type: [mongoose.Schema.Types.String],
        required: [true, 'Please enter a time to start'],
    }
})

module.exports = mongoose.model('Bus', BusSchema);