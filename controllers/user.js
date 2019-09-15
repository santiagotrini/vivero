const User = require('../models/User');
const bcrypt = require('bcrypt');

// POST /api/user
exports.save = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    password: req.body.password
  });
  // hashear password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(err => {
        if (err) return next(err);
        res.status(200).json(user);
      });
    });
  });
};

// GET /api/users
exports.all = (req, res) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.status(200).json(users);
  });
};

// GET /api/user/:id
exports.one = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.status(200).json(user);
  });
};

// PUT /api/user/:id

// DELETE /api/user/:id
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.status(200).json({ msg: 'delete OK' });
  });
};
