const Joi = require('@hapi/joi');

module.exports = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};
