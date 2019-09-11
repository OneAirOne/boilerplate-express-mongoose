const express = require('express');
const authController = require('./auth.controller');
const DTOMiddleware = require('../../shared/dto.middleware');
const userShema = require('./dto/shema.dto');

const router = express.Router();

router.route('/register').post(DTOMiddleware(userShema), authController.login);

module.exports = router;
