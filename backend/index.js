require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    })



app.use(express.json());

const userRouter = require('./routes/userRoutes');
const routeRouter = require('./routes/routeRoutes');
const busRouter = require('./routes/busRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const busStopRouter = require('./routes/busStopRoutes');

app.use('/users', verifyToken, userRouter);
app.use('/routes', verifyToken, routeRouter);
app.use('/buses', verifyToken, busRouter);
app.use('/tickets', verifyToken, ticketRouter);
app.use('/busStops', verifyToken, busStopRouter);

let users = [
    {
        id: 1,
        username: "admin",
        refreshToken: null
    },
    {
        id: 2,
        username: "user",
        refreshToken: null
    }
]

const updateRefreshToken = (username, refreshToken) => {
    users = users.map(user => {
        if (user.username === username) {
            return {
                ...user,
                refreshToken
            }
        }
        return user;
    })
}

const generateTokens = payload => {
    const { id, username } = payload;
    const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1d'
        });

    const refreshToken = jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    console.log(users)
    return { accessToken, refreshToken }
}


app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.sendStatus(401).json({
            message: 'Invalid username'
        })
    }

    const tokens = generateTokens(user)
    updateRefreshToken(username, tokens.refreshToken);
    console.log(users)
    res.json(tokens)
})

app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        return res.sendStatus(401);
    }
    const user = users.find(user => user.refreshToken === refreshToken);

    if(!user){
        return res.sendStatus(403);
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const tokens = generateTokens(user);
        updateRefreshToken(user.username, tokens.refreshToken);

        res.json(tokens);
    } catch (error) {
        console.log(error)
        return res.sendStatus(403);
    }

})


app.delete('/logout', verifyToken, (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    updateRefreshToken(user.username, null);
    res.sendStatus(204);
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})