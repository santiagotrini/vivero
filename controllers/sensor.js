const Sensor = require('../models/Sensor');
const Product = require('../models/Product');

// POST /api/sensor
exports.save = (req, res, next) => {
  Product.findOne({ name: req.body.product }, (err, product) => {
    // console.log(product.id);
    // console.log(product.name);
    req.body.product = product.id;
    req.body.unit = (req.body.sensorType == 'Temperatura') ? 'ºC' : '%';
    const sensor = new Sensor({
      sensorType: req.body.sensorType,
      unit: req.body.unit,
      product: req.body.product
    });
    sensor.save(err => {
      if (err) return next(err);
      res.redirect('/dashboard/sensors');
      // res.status(200).json(sensor);
    });

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
