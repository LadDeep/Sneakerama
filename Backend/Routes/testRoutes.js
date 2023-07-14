const express = require('express');

const router = express.Router()

//Sample root method
router.get('/', async (req, res) => {
    res.send('Hello Sneakerheads!')
})

module.exports = router