const Product = require('../models/Product');

// POST /api/product
exports.save = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    minT: req.body.minT,
    maxT: req.body.maxT,
    minH: req.body.minH,
    maxH: req.body.maxH
  });
  product.save(err => {
    if (err) return next(err);
    // res.redirect('/dashboard');
    res.status(200).json(product);
  });
};

// GET /api/products
exports.all = (req, res) => {
  Product.find((err, products) => {
    if (err) return next(err);
    res.status(200).json(products);
  });
};

// GET /api/product/:id
exports.one = (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) return next(err);
    res.status(200).json(product);
  });
};

// PUT /api/product/:id
exports.update = (req, res) => {
  res.send('TODO');
};

// DELETE /api/product/:id
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.status(200).json({ msg: 'delete OK' });
  });
};
