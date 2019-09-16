const express = require('express');
const router = express.Router();
const passport = require('passport');
const Reading = require('../models/Reading');
const Sensor = require('../models/Sensor');
const User = require('../models/User');
const Product = require('../models/Product');
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
      User.find((err, users) => {
        if (err) return next(err);
        Sensor.find((err, sensors) => {
          if (err) return next(err);
          res.render('dashboard', { user: req.user,
                                    users: users,
                                    sensors: sensors
                                   });
        });
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
          User.find((err, users) => {
            if (err) return next(err);
            res.render('dashboard', { user: req.user, users: users, showUsers: true })
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
