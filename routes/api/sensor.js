const express = require('express');
const router = express.Router();

const sensor = require('../../controllers/sensor');

// sensor api routes
// POST /sensor
router.post('/sensor', sensor.save);
// GET /sensors
// GET /sensor/:id
// PUT /sensor/:id
router.get('/sensors', sensor.all);
// DELETE /sensor/:id
router.delete('/sensor/:id', sensor.delete);

module.exports = router;
