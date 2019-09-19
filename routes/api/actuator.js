const express = require('express');
const router = express.Router();

const actuator = require('../../controllers/actuator');
const Actuator = require('../../models/Actuator');
// actuator api routes
// POST /actuator
router.post('/actuator', actuator.save);
// GET /actuators
// GET /actuator/:id
router.post('/actuator/:id/update', (req, res, next) => {
  Actuator.findById(req.params.id, (err, actuator) => {
    if (err) return next(err);
    actuator.status = req.body.status;
    actuator.save(err => {
      res.redirect('/dashboard/actuators');
    });
  });
});
router.get('/actuator/:id', actuator.one);
// PUT /actuator/:id
router.get('/actuators', actuator.all);
// DELETE /actuator/:id
router.delete('/actuator/:id', actuator.delete);

module.exports = router;
