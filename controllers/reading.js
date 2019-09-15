const Reading = require('../models/Reading');

// POST /api/reading
exports.save = (req, res, next) => {
  const reading = new Reading({
    sensor: req.body.sensor,
    value: req.body.value
  });
  reading.save(err => {
    if (err) return next(err);
    res.status(200).json(reading);
  });
};

// PUT /reading/:id
// GET /reading/:id
exports.one = (req, res, next) => {
  Reading.findById(req.params.id, (err, reading) => {
    if (err) return next(err);
    res.status(200).json(reading);
  });
};

// GET /readings/:sensor

// GET /api/readings
exports.all = (req, res) => {
  Reading.find((err, readings) => {
    if (err) return next(err);
    res.status(200).json(readings);
  });
};

// DELETE /api/reading/:id
exports.delete = (req, res) => {
  reading.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.status(200).json({ msg: 'delete OK' });
  });
};
