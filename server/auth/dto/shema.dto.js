const Joi = require('joi');

module.exports = {
  email: Joi.string(),
  password: Joi.string(),
};
