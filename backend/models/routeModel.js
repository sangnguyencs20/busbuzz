const mongoose = require('mongoose');
const RouteSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    timeline: {
        type: [String],
        required: [true, 'Please enter a timeline'],
    },
    places: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStop'}],

        required: [true, 'Please enter a places'],
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: [true, 'Please enter a bus'],
    }
});

module.exports = mongoose.model('Route', RouteSchema);