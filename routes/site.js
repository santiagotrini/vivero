const express = require('express');
const router = express.Router();
const passport = require('passport');

// site routes
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
router.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
      res.render('dashboard', { user: req.user });
    });
router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
