/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
const jwt = require('jsonwebtoken');
const UnauthError = require('../errors/UnauthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthError('Необходимо авторизироваться1');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`
    );
  } catch (err) {
    throw new UnauthError('Необходимо авторизироваться2');
  }

  req.user = payload;

  next();
};
