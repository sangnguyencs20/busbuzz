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
const routeRouter = require('./routes/routeRoutes');
const busRouter = require('./routes/busRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const busStopRouter = require('./routes/busStopRoutes');

app.use('/users', userRouter);
app.use('/routes', routeRouter);
app.use('/buses', busRouter);
app.use('/tickets', ticketRouter);
app.use('/busStops', busStopRouter);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})