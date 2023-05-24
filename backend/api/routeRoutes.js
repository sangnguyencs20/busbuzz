const express = require('express');
const mongoose = require('mongoose');

const RouteModel = require('../models/routeModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const routes = await RouteModel.find().populate('places').populate('bus').exec();
        if (routes.length === 0) {
            res.status(204).json({ message: 'No routes found' });
        }
        res.status(200).json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
)

router.get('/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id).populate('places').populate('bus').exec();
        if (route === null) {
            res.status(204).json({ message: 'No route found' });
        }
        res.status(200).json(route);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/search', async (req, res) => {
    try {
        const { start, end } = req.body;
        const routes = await RouteModel.find({ places: { $all: [start, end] } })
            .populate('places')
            .populate('bus')
            .exec();
        if (routes.length === 0) {
            res.status(204).json({ message: 'No routes found' });
        }
        res.status(200).json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.post('/', async (req, res) => {
    const route = new RouteModel({
        price: req.body.price,
        timeline: req.body.timeline,
        places: req.body.places
    });
    try {
        const newRoute = await route.save();
        res.status(201).json(newRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id);
        route.price = req.body.price;
        route.timeline = req.body.timeline;
        route.places = req.body.places;
        const updatedRoute = await route.save();
        res.status(202).json(updatedRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id);
        const deletedRoute = await route.remove();
        res.status(202).json(deletedRoute);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;