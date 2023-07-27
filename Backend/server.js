require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.DATABASE_URL
const reviewRoutes = require('./Routes/reviewRoutes');
const userRoutes = require('./Routes/userRoutes');
const PaymentRoutes = require('./Routes/PaymentRoute')
const productRoutes = require('./Routes/productRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const orderRoutes = require ('./Routes/orderRoutes')

mongoose.connect(mongoString,{
    dbName: 'sneakerama_db'
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors({ origin: true }));

app.use(express.json({limit: "10Mb"}));

app.use(reviewRoutes)
app.use(userRoutes)
app.use(productRoutes);

app.use(eventRoutes);
app.use(PaymentRoutes)
app.use(orderRoutes)

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})
