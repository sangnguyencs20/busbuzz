require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth');
app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = users.find(user => user.username === username);
    if (!user) {
        res.sendStatus(401).json({
            message: 'Invalid username'
        })
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, 
    { 
        expiresIn: '1d'
    });
    res.json({ accessToken })
})