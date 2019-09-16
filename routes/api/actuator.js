const express = require('express');
const router = express.Router();

const actuator = require('../../controllers/actuator');

// actuator api routes
// POST /actuator
router.post('/actuator', actuator.save);
// GET /actuators
// GET /actuator/:id
router.get('/actuator/:id', actuator.one);
// PUT /actuator/:id
router.get('/actuators', actuator.all);
// DELETE /actuator/:id
router.delete('/actuator/:id', actuator.delete);

module.exports = router;
