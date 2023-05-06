const express = require('express');

const BusModel = require('../models/busModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const buses = await BusModel.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const bus = await BusModel.findById(req.params.id);
        res.json(bus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    const bus = new BusModel({
        licensePlate: req.body.licensePlate,
        timeToStart: req.body.timeToStart,
    });
    try {
        const newBus = await bus.save();
        res.status(201).json(newBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const bus = await BusModel.findById(req.params.id);
        bus.licensePlate = req.body.licensePlate;
        bus.timeToStart = req.body.timeToStart;
        const updatedBus = await bus.save();
        res.json(updatedBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

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