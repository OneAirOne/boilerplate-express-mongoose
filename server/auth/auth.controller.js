const httpStatus = require('http-status');

const AuthService = require('./auth.service');

async function register(req, res) {
  const { email, password } = req.body;

  try {
    const user = await AuthService.create({ email, password });

    return res.status(httpStatus.CREATED).json(`user ${user.email} created`);
  } catch (error) {
    const { status } = error;

    return res
      .status(status ? status : httpStatus.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const response = await AuthService.get({ email, password });

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    const { status } = error;

    return res
      .status(status ? status : httpStatus.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
}

async function getUsers(req, res) {
  try {
    const users = await AuthService.getAll();

    return res.status(httpStatus.OK).send(users);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

module.exports = { register, login, getUsers };
