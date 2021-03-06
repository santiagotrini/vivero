const express = require('express');
const router = express.Router();

const user = require('../../controllers/user');

// User api routes
// POST /user
router.post('/user', user.save);
// GET /users
// GET /user/:id
router.get('/user/:id', user.one);
// PUT /user/:id
router.get('/users', user.all);
// DELETE /user/:id
router.delete('/user/:id', user.delete);

module.exports = router;
