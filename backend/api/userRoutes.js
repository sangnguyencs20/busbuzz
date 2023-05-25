/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         fullname:
 *           type: string
 *           description: The full name of the user
 *       required:
 *         - username
 *         - password
 *         - fullname
 */

const express = require('express');

const UserModel = require('../models/userModel');
const ticketModel = require('../models/ticketModel');

const router = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        if (users.length === 0) {
            res.status(204).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id);
        if(user === null){
            res.status(204).json({ message: 'No user found' });
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', async (req, res) => {
    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       202:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.patch('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        user.username = req.body.username;
        user.password = req.body.password;
        user.fullname = req.body.fullname;
        const updatedUser = await user.save();
        res.status(202).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.delete('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const deletedUser = await user.remove();
        res.status(202).json(deletedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * @swagger
 * /users/{id}/ticket:
 *   get:
 *     summary: Get user's ticket by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: User's ticket retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/:id/ticket', async (req, res) => {
    try {
        const user = await ticketModel.findById(req.params.id);
        if(user === null){
            res.status(204).json({ message: 'No user found' });
        }
        else res.status(202).json(user.ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;