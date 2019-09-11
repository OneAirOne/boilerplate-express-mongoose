const Joi = require('joi');

module.exports = shema => {
  return function(req, res, next) {
    Joi.validate(req.body, shema, error => {
      if (error) return res.status(400).send(error);
      return next();
    });
  };
};
