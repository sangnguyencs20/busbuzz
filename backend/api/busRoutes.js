
/**
 * @swagger
 * /buses:
 * components:
 *   schemas:
 *     Bus:
 *       type: object
 *       properties:
 *         licensePlate:
 *           type: string
 *           description: License plate of the bus
 *         timeToStart:
 *           type: array
 *           items:
 *             type: string
 *           description: Time(s) to start the bus
 *         number:
 *           type: integer
 *           description: Unique number of the bus
 *       required:
 *         - licensePlate
 *         - timeToStart
 *         - number
*/


const express = require('express');

const BusModel = require('../models/busModel');
const router = express.Router();


/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Get all buses
 *     description: Retrieve all buses.
 *     responses:
 *       200:
 *         description: A list of buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       204:
 *         description: No buses found
 *     security:
 *       - BearerAuth: []
 */

router.get('/', async (req, res) => {
    try {
        const buses = await BusModel.find();
        if(buses.length === 0) 
        {
            res.status(204).json({ message: 'No buses found' })
        }
        else 
            res.status(200).json(buses)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     description: Retrieve a bus by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the bus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       204:
 *         description: No bus found
 *     security:
 *       - BearerAuth: []
 */
router.get('/:id', async (req, res) => {
    try {
        const bus = await BusModel.findById(req.params.id);
        if(bus === null){
            res.status(204).json({ message: 'No bus found' })
        }
        else {
            res.status(200).json(bus);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Create a new bus
 *     description: Create a new bus.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Successfully created a new bus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       400:
 *         description: Bad request
 *     security:
 *       - BearerAuth: []
 */
router.post('/', async (req, res) => {
    const bus = new BusModel({
        licensePlate: req.body.licensePlate,
        timeToStart: req.body.timeToStart,
        number: req.body.number,
    });
    try {
        const newBus = await bus.save();
        res.status(201).json(newBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


/**
 * @swagger
 * /buses/{id}:
 *   patch:
 *     summary: Update a bus by ID
 *     description: Update a bus by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Successfully updated the bus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       400:
 *         description: Bad request
 *     security:
 *       - BearerAuth: []
 */
router.patch('/:id', async (req, res) => {
    try {
        const bus = await BusModel.findById(req.params.id);
        bus.licensePlate = req.body.licensePlate;
        bus.timeToStart = req.body.timeToStart;
        bus.number = req.body.number;
        const updatedBus = await bus.save();
        res.json(updatedBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID
 *     description: Delete a bus by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the bus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       400:
 *         description: Bad request
 *     security:
 *       - BearerAuth: []
 */
router.delete('/:id', async (req, res) => {
    try {
        const bus = await BusModel.findById(req.params.id);
        const deletedBus = await bus.remove();
        res.json(deletedBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;