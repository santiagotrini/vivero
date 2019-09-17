const Actuator = require('../models/Actuator');
const Product = require('../models/Product');

// POST /api/actuator
exports.save = (req, res, next) => {
  Product.findOne({ name: req.body.product }, (err, product) => {
    req.body.product = product.id;
    req.body.statusType = (req.body.actuatorType == 'Rociador') ? 'toggle' : 'slider';
    req.body.status = (req.body.statusType == 'toggle') ? 'off' : '100';
    const actuator = new Actuator({
      actuatorType: req.body.actuatorType,
      statusType: req.body.statusType,
      status: req.body.status,
      product: req.body.product
    });
    actuator.save(err => {
      if (err) return next(err);
      res.redirect('/dashboard/actuators');
      // res.status(200).json(actuator);
    });
  });
};

// GET /api/actuators
exports.all = (req, res) => {
  Actuator.find((err, actuators) => {
    if (err) return next(err);
    res.status(200).json(actuators);
  });
};

// GET /api/actuator/:id
exports.one = (req, res, next) => {
  Actuator.findById(req.params.id, (err, actuator) => {
    if (err) return next(err);
    res.status(200).json(actuator);
  });
};

// PUT /api/actuator/:id
exports.update = (req, res) => {
  res.send('TODO');
};

// DELETE /api/actuator/:id
exports.delete = (req, res) => {
  Actuator.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.status(200).json({ msg: 'delete OK' });
  });
};
