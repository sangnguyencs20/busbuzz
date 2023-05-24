/**
 * @swagger
 * tags:
 *   name: Bus Stops
 *   description: Bus stop management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusStop:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the bus stop
 *         latitude:
 *           type: number
 *           format: double
 *           description: The latitude coordinate of the bus stop
 *         longitude:
 *           type: number
 *           format: double
 *           description: The longitude coordinate of the bus stop
 *         address:
 *           type: string
 *           description: The address of the bus stop
 *       required:
 *         - name
 *         - latitude
 *         - longitude
 *         - address
 */


const express = require('express');

const BusStopModel = require('../models/busStopModel');

const router = express.Router();


/**
 * @swagger
 * /busStops:
 *   get:
 *     summary: Get all bus stops
 *     tags: [Bus Stops]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusStop'
 */
router.get('/', async (req, res) => {
    try {
        const busStops = await BusStopModel.find();
        if (busStops.length === 0) {
            res.status(204).json({ message: 'No bus stops found' })
        }
        res.status(200).json(busStops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /busStops/{id}:
 *   get:
 *     summary: Get a bus stop by ID
 *     tags: [Bus Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the bus stop to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusStop'
 */
router.get('/:id', async (req, res) => {
    try {
        const busStop = await BusStopModel.findById(req.params.id);
        if (busStop === null) {
            res.status(204).json({ message: 'No bus stop found' })
        }
        res.status(200).json(busStop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * @swagger
 * /busStops:
 *   post:
 *     summary: Create a new bus stop
 *     tags: [Bus Stops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusStop'
 *     responses:
 *       201:
 *         description: Bus stop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusStop'
 */
router.post('/', async (req, res) => {
    const busStop = new BusStopModel({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address
    });
    try {
        const newBusStop = await busStop.save();
        res.status(201).json(newBusStop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/**
 * @swagger
 * /busStops/{id}:
 *   patch:
 *     summary: Update a bus stop by ID
 *     tags: [Bus Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the bus stop to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusStop'
 *     responses:
 *       202:
 *         description: Bus stop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusStop'
 */
router.patch('/:id', async (req, res) => {
    try {
        const busStop = await BusStopModel.findById(req.params.id);
        busStop.name = req.body.name;
        busStop.latitude = req.body.latitude;
        busStop.longitude = req.body.longitude;
        busStop.address = req.body.address;
        const updatedBusStop = await busStop.save();
        res.status(202).json(updatedBusStop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


/**
 * @swagger
 * /busStops/{id}:
 *   delete:
 *     summary: Delete a bus stop by ID
 *     tags: [Bus Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the bus stop to delete
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Bus stop deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusStop'
 */
router.delete('/:id', async (req, res) => {
    try {
        const busStop = await BusStopModel.findById(req.params.id);
        const deletedBusStop = await busStop.remove();
        res.status(202).json(deletedBusStop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * @swagger
 * /busStops/search/{name}:
 *   get:
 *     summary: Search bus stops by name
 *     tags: [Bus Stops]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusStop'
 */
router.get('/search/:name', async (req, res) => {
    try {
        const searchTerm = decodeURIComponent(req.params.name);
        const busStop = await BusStopModel.find({ name: { $regex: searchTerm, $options: 'i' } });
        if (busStop === null) {
            res.status(204).json({ message: 'No bus stop found' })
        }
        res.status(200).json(busStop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;