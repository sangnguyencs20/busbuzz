const express = require('express');

const BusStopModel = require('../models/busStopModel');

const router = express.Router();

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

router.delete('/:id', async (req, res) => {
    try {
        const busStop = await BusStopModel.findById(req.params.id);
        const deletedBusStop = await busStop.remove();
        res.status(202).json(deletedBusStop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

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