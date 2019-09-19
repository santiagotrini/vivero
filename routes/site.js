const express = require('express');
const router = express.Router();
const passport = require('passport');
const Reading = require('../models/Reading');
const Sensor = require('../models/Sensor');
const User = require('../models/User');
const Product = require('../models/Product');
const Actuator = require('../models/Actuator');
const user = require('../controllers/user');
// site routes

// landing page
router.get('/', (req, res) => {
  res.render('index');
});

// login form
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// render dashboard
router.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
      // pasar toda la data
      Product.find((err, products) => {
        if (err) return next(err);
        res.render('dashboard', { user: req.user, products: products, showProducts: true });
      });
    });

router.get('/dashboard/products',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
      // pasar toda la data
      Product.find((err, products) => {
        if (err) return next(err);
        res.render('dashboard', { user: req.user, products: products, showProducts: true })
      });
    });

router.get('/dashboard/users',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
      // pasar toda la data
      if (req.user.role == 'admin') {
        User.find((err, users) => {
          if (err) return next(err);
          res.render('dashboard', { user: req.user, users: users, showUsers: true })
        });
      } else {
        res.redirect('/dashboard');
      }
    });

router.get('/dashboard/sensors',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
      // pasar toda la data
      Sensor.find((err, sensors) => {
        if (err) return next(err);
        Product.find((err, products) => {
          if (err) return next(err);
          Reading.find().sort({timestamp: -1, sensor: 1}).exec((err, readings) => {
            res.render('dashboard', { user: req.user, products: products, sensors: sensors, showSensors: true, readings: readings })
          });
        });
      });
    });

router.get('/dashboard/sensor/:id/readings', (req, res, next) => {
  Reading.find({ sensor: req.params.id }).sort('-timestamp').exec((err, readings) => {
    if (err) return next(err);
    Sensor.findById(req.params.id, (err, sensor) => {
      if (err) return next(err);
      res.render('dashboard', { sensor: sensor, user: req.user, readings: readings, showReadings: true });
    });
  });
});

router.get('/dashboard/actuators',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
      // pasar toda la data
      Actuator.find((err, actuators) => {
        if (err) return next(err);
        Product.find((err, products) => {
          if (err) return next(err);
            res.render('dashboard', { user: req.user, actuators: actuators, products: products, showActuators: true })
        });
      });
    });

router.get('/dashboard/sensor/:id/delete', (req, res) => {
  Sensor.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.redirect('/dashboard/sensors');
  });
});

router.get('/dashboard/product/:id/delete', (req, res) => {
  Product.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.redirect('/dashboard/products');
  });
});

router.get('/dashboard/user/:id/delete', (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.redirect('/dashboard/users');
  });
});

router.get('/dashboard/actuator/:id/toggle', (req, res) => {
  Actuator.findById(req.params.id, (err, actuator) => {
    if (err) return next(err);
    if (actuator.status == 'on') actuator.status = 'off';
    else actuator.status = 'on';
    // aca habria que publicar al broker el nuevo estado, falta hacer
    actuator.save(err => {
      if (err) return next(err);
      res.redirect('/dashboard/actuators');
    })
  });
});

// logout
router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
});

// signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', user.save);

module.exports = router;
