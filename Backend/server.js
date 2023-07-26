require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.DATABASE_URL
const routes = require('./Routes/routes');
const PaymentRoutes = require('./Routes/PaymentRoute')

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

app.use(express.json());

app.use(routes)
app.use(PaymentRoutes)

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})