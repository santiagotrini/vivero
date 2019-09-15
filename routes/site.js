const express = require('express');
const router = express.Router();
const passport = require('passport');

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
      // TODO
      res.render('dashboard', { user: req.user });
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
router.post('/signup', (req, res) => {
  res.send('TODO');
});

module.exports = router;
