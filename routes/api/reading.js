const express = require('express');
const router = express.Router();

const reading = require('../../controllers/reading');

// reading api routes
// POST /reading
router.post('/reading', reading.save);
// GET /readings
router.get('/readings', reading.all);
// DELETE /reading/:id
router.delete('/reading/:id', reading.delete);
// PUT /reading/:id
// GET /reading/:id
// GET /readings/:sensor

module.exports = router;
