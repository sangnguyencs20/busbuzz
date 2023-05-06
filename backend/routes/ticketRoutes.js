const express = require('express');
const TicketModel = require('../models/ticketModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tickets = await TicketModel.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); // Added closing parenthesis here

router.get('/:id', async (req, res) => {
    try {
        const ticket = await TicketModel.findById(req.params.id);
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const ticket = new TicketModel({
        routeId: req.body.routeId,
        day: req.body.day,
        qrcode: req.body.qrcode,
        startStop: req.body.startStop,
        endStop: req.body.endStop,
    });
    try {
        const newTicket = await ticket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const ticket = await TicketModel.findById(req.params.id);
        ticket.routeId = req.body.routeId;
        ticket.day = req.body.day;
        ticket.qrcode = req.body.qrcode;
        ticket.startStop = req.body.startStop;
        ticket.endStop = req.body.endStop;
        const updatedTicket = await ticket.save();
        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ticket = await TicketModel.findById(req.params.id);
        const deletedTicket = await ticket.remove();
        res.json(deletedTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
