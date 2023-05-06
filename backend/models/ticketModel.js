const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter a route id'],
    },
    day : {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
    qrcode: {
        type: String,
        required: [true, 'Please enter a qrcode'],
    },
    startStop: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter a start stop'],
    },
    endStop: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter an end stop'],
    }
})

module.exports = mongoose.model('Ticket', TicketSchema);