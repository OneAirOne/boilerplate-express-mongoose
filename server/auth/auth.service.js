const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const encryption = require('../helpers/encryption');
const tokenUtils = require('../helpers/tokenUtils');
// const bcrypt = require('bcrypt');

const AuthModel = require('./auth.model');

async function create({ email, password }) {
  const user = await AuthModel.find({ email });
  if (user && user.length) {
    throw new APIError(
      'User allready exist',
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
    );
  }
  const hash = await encryption.encrypt(password);

  return AuthModel.create({ email, password: hash });
}

async function get({ email, password }) {
  const user = await AuthModel.find({ email });

  if (user && !user.length) {
    throw new APIError('User not allowed', httpStatus.UNAUTHORIZED, true);
  }
  const result = await encryption.verify(password, user[0].password);

  if (!result) {
    throw new APIError('User not allowed', httpStatus.UNAUTHORIZED, true);
  }

  const token = tokenUtils.generateToken(email, user[0]._id);

  return {
    message: 'Auth successfull',
    token,
  };
}

async function getAll() {
  return AuthModel.find();
}

module.exports = {
  create,
  get,
  getAll,
};
