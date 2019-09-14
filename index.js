// dependencies
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
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
// const apiRouter = require('./routes/api');
app.use('/', siteRouter);
// app.use('/api', apiRouter);
// listen
app.listen(port, () => { console.log(`Server listening on port ${port}`) });
