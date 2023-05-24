const express = require('express');
const TicketModel = require('../models/ticketModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tickets = await TicketModel.find();
        if (tickets.length === 0) {
            res.status(204).json({ message: 'No tickets found' });
        }
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const ticket = await TicketModel.findById(req.params.id);
        if (ticket === null) {
            res.status(204).json({ message: 'No ticket found' });
        }
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const ticket = new TicketModel({
        routeId: req.body.routeId,
        day: req.body.day,
        time: req.body.time,
        startStop: req.body.startStop,
        endStop: req.body.endStop,
        price: req.body.price,
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
        ticket.time = req.body.time;
        ticket.startStop = req.body.startStop;
        ticket.endStop = req.body.endStop;
        ticket.price = req.body.price;
        const updatedTicket = await ticket.save();
        res.status(202).json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ticket = await TicketModel.findById(req.params.id);
        const deletedTicket = await ticket.remove();
        res.status(200).json(deletedTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
