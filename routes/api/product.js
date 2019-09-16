const express = require('express');
const router = express.Router();

const product = require('../../controllers/product');

// product api routes
// POST /product
router.post('/product', product.save);
// GET /products
// GET /product/:id
router.get('/product/:id', product.one);
// PUT /product/:id
router.get('/products', product.all);
// DELETE /product/:id
router.delete('/product/:id', product.delete);

module.exports = router;
