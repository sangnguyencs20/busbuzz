const mongoose = require('mongoose');
const RouteSchema = new mongoose.Schema({
    price:{
        type: Number,
        required: [true, 'Please enter a price'],
    },
    start: {
        type: String,
        required: [true, 'Please enter a start'],
    },
    end: {
        type: String,
        required: [true, 'Please enter an end'],
    },
    timeline: {
        type: [mongoose.Schema.Types.String],
        required: [true, 'Please enter a timeline'],
    }
});

module.exports = mongoose.model('Route', RouteSchema);