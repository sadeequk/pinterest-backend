var path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});
console.log(`Your environment is set to: ${process.env.NODE_ENV}`);
var createError = require('http-errors');
var express = require('express');
// const cors = require('cors');

const { mongooseConnection } = require('./config/db');
const session = require('express-session');

// Importing middlewares
const loggerMiddleware = require('./middlewares/logger.middleware');
const responseMiddleware = require('./middlewares/response.middleware');
// App initialized
var app = express();

// Response Middleware
app.use(responseMiddleware);

mongooseConnection();

// Accept JSON in Request
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '200mb' }));

// Logger Middleware
app.use(loggerMiddleware);

// Enable Cors Middleware
// app.use(cors());

// Session Middleware
app.use(
  session({
    secret: 'secret2024',
    resave: false,
    saveUninitialized: false,
  })
);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Pinterest' });
});

// Routes
app.use('/api/v1', require('./routes/index'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  } else {
    console.log('Page Not Found');
  }
  res.fail('Page Not Found');
});

// Ensure database disconnects on application termination
process.on('SIGINT', async () => {
  process.exit(0);
});

module.exports = app;
