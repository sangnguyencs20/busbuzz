const express = require('express');

const UserModel = require('../models/userModel');

const router = express.Router();

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

router.delete('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const deletedUser = await user.remove();
        res.status(202).json(deletedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id/ticket', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if(user === null){
            res.status(204).json({ message: 'No user found' });
        }
        res.status(202).json(user.ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;