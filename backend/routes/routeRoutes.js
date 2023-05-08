const express = require('express');

const RouteModel = require('../models/routeModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
)

router.get('/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id);
        res.json(route);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    const route = new RouteModel({
        price: req.body.price,
        start: req.body.start,
        end: req.body.end,
        timeline: req.body.timeline,
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
        route.start = req.body.start;
        route.end = req.body.end;
        route.timeline = req.body.timeline;
        const updatedRoute = await route.save();
        res.json(updatedRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id);
        const deletedRoute = await route.remove();
        res.json(deletedRoute);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;