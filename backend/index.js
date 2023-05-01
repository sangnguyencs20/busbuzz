require('dotenv').config()

const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed');
})

app.use(express.json());

const userRouter = require('./routes/userRoutes');

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})