/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
require('dotenv').config();

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const helmet = require('helmet');

const { errors, celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
  }),
});

app.use('/api/', apiLimiter);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserSignup, createUser);
app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('open', () => console.log('db connected!'));
mongoose.connection.on('error', () => console.log('db NOT connected!'));

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
