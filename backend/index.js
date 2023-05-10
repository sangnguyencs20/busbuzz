require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
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

const updateRefreshToken = async (username, refreshToken) => {
    try {
        const user = await User.findOneAndUpdate(
            { username },
            { refreshToken },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



const generateTokens = payload => {
    const { id, username } = payload;
    const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });

    const refreshToken = jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });

    return { accessToken, refreshToken };
};



app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const tokens = generateTokens(user);
        updateRefreshToken(username, tokens.refreshToken);
        res.json(tokens);
    } catch (error) {
        console.error('Error during login:', error);
        res.sendStatus(500);
    }
});




app.delete('/logout', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.sendStatus(404);
        }

        user.refreshToken = null;
        await user.save();

        res.sendStatus(204); // send response only once
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // send response only once
    }
});



app.post('/signup', async (req, res) => {
    const { username, password, fullName } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            fullName
        });
        console.log(newUser)
        await newUser.save();

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
