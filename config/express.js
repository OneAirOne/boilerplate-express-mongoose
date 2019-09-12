const config = require('./config');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const APIError = require('../server/helpers/APIError');
const route = require('../index.route');

const app = express();

if (config.env === 'developpement') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use('/api', route);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);

  return next(err);
});

// error handler, send stacktrace only during development
app.use((
  err,
  req,
  res,
  next, // eslint-disable-line no-unused-vars
) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  }),
);

module.exports = app;
