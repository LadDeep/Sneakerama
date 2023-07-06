const express = require('express');
const routes = require('./Routes/testRoutes');

const app = express();

app.use(express.json());

app.use(routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})