const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const APIError = require('./APIError');

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {Promise}
 */
function encrypt(password) {
  return new Promise(function(resolve) {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new APIError(
          'Internal stuff',
          httpStatus.INTERNAL_SERVER_ERROR,
          true,
        );
      }
      resolve(hash);
    });
  });
}

/**
 * Verify if password is equal to the hash
 *
 * @param {String} password
 * @param {String} hash
 */
function verify(password, hash) {
  return new Promise(function(resolve) {
    bcrypt.compare(password, hash, async (err, result) => {
      if (err) {
        throw new APIError('User not allowed', httpStatus.UNAUTHORIZED, true);
      }
      resolve(result);
    });
  });
}

module.exports = { encrypt, verify };
