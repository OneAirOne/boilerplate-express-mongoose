const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Auth failed',
    });
  }
};
