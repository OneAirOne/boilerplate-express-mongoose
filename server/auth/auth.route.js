const express = require('express');
const authController = require('./auth.controller');
const DTOMiddleware = require('../../shared/dto.middleware');
const checkAuth = require('../../shared/auth.middleware');
const userShema = require('./dto/shema.dto');

const router = express.Router();

router.route('/').get(checkAuth, authController.getUsers);

router
  .route('/register')
  .post(DTOMiddleware(userShema), authController.register);

router.route('/login').post(authController.login);

module.exports = router;
