/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       properties:
 *         price:
 *           type: number
 *           description: The price of the route
 *         timeline:
 *           type: string
 *           description: The timeline of the route
 *         places:
 *           type: array
 *           items:
 *             type: string
 *           description: The places covered by the route
 *       required:
 *         - price
 *         - timeline
 *         - places
 */


const express = require('express');
const mongoose = require('mongoose');

const RouteModel = require('../models/routeModel');

const router = express.Router();


/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */
router.get('/', async (req, res) => {
    try {
        const routes = await RouteModel.find().populate('places').populate('bus').exec();
        if (routes.length === 0) {
            res.status(204).json({ message: 'No routes found' });
        }
        else res.status(200).json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
)


/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 */
router.get('/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id).populate('places').populate('bus').exec();
        if (route === null) {
            res.status(204).json({ message: 'No route found' });
        }
        else res.status(200).json(route);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * @swagger
 * /routes/search:
 *   post:
 *     summary: Search routes by start and end places
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 description: The start place of the route
 *               end:
 *                 type: string
 *                 description: The end place of the route
 *             required:
 *               - start
 *               - end
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */
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
        else res.status(200).json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 */
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


/**
 * @swagger
 * /routes/{id}:
 *   patch:
 *     summary: Update a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       202:
 *         description: Route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 */
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


/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Delete a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to delete
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Route deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 */
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