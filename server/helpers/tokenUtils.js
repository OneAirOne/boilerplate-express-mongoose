const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function generateToken(email, userId) {
  const token = jwt.sign(
    {
      email,
      userId,
    },
    config.jwtSecret,
    {
      expiresIn: '1h',
    },
  );
  
return token;
}

module.exports = { generateToken };
