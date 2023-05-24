/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         routeId:
 *           type: string
 *           description: The ID of the route
 *         day:
 *           type: string
 *           description: The day of the ticket
 *         time:
 *           type: string
 *           description: The time of the ticket
 *         startStop:
 *           type: string
 *           description: The starting stop of the ticket
 *         endStop:
 *           type: string
 *           description: The ending stop of the ticket
 *         price:
 *           type: number
 *           description: The price of the ticket
 *       required:
 *         - routeId
 *         - day
 *         - time
 *         - startStop
 *         - endStop
 *         - price
 */

const express = require('express');
const TicketModel = require('../models/ticketModel');

const router = express.Router();


/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
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


/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
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


/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
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


/**
 * @swagger
 * /tickets/{id}:
 *   patch:
 *     summary: Update a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       202:
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
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


/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
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
