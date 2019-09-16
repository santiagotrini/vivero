const Sensor = require('../models/Sensor');

// POST /api/sensor
exports.save = (req, res, next) => {
  const sensor = new Sensor({
    sensorType: req.body.sensorType,
    unit: req.body.unit,
    product: req.body.product
  });
  sensor.save(err => {
    if (err) return next(err);
    // res.redirect('/dashboard');
    res.status(200).json(sensor);
  });
};

// GET /api/sensors
exports.all = (req, res) => {
  Sensor.find((err, sensors) => {
    if (err) return next(err);
    res.status(200).json(sensors);
  });
};

// GET /api/sensor/:id
exports.one = (req, res, next) => {
  Sensor.findById(req.params.id, (err, sensor) => {
    if (err) return next(err);
    res.status(200).json(sensor);
  });
};

// PUT /api/sensor/:id
exports.update = (req, res) => {
  res.send('TODO');
};

// DELETE /api/sensor/:id
exports.delete = (req, res) => {
  Sensor.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.status(200).json({ msg: 'delete OK' });
  });
};
