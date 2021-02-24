/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
const jwt = require('jsonwebtoken');
const UnauthError = require('../errors/UnauthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
<<<<<<< HEAD
    throw new UnauthError('Необходимо авторизироваться1');
=======
    throw new UnauthError('Необходимо авторизироваться');
>>>>>>> 32649233938857a55f59db383522327fb5e88e50
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`
    );
  } catch (err) {
<<<<<<< HEAD
    throw new UnauthError('Необходимо авторизироваться2');
=======
    throw new UnauthError('Необходимо авторизироваться');
>>>>>>> 32649233938857a55f59db383522327fb5e88e50
  }

  req.user = payload;

  next();
};
