// dependencies
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// config
const port = 3000;
const db = 'mongodb://localhost/vivero';

// app object
const app = express();

// database connection
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");
  })
.catch(err => console.error(`Connection error ${err}`));

// passport config
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) throw err;
      if (!res) return done(null, false);
      else return done(null, user);
    });
  });
}));
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'olimpiadas inet',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// views & public folder
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

// routes
const siteRouter = require('./routes/site');
const usersRouter = require('./routes/api/user');
const readingsRouter = require('./routes/api/reading');
const sensorsRouter = require('./routes/api/sensor');
app.use('/', siteRouter);
app.use('/api', usersRouter);
app.use('/api', readingsRouter);
app.use('/api', sensorsRouter);

// mqtt subscribe
const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  // subscribe topics on connection
  console.log('Connected to MQTT broker');
  client.subscribe('temp', err => {
    if (!err) {
      console.log('Subscribing on temp');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(topic.toString() + ': ' + message.toString())
  // si recibo un mensaje puedo hacer lo que quiera aca, como un insert
});


// listen
app.listen(port, () => { console.log(`Server listening on port ${port}`) });
