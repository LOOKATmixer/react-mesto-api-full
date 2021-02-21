const router = require('express').Router();
const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

const validateUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((url) => {
        if (!validator.isURL(url)) {
          throw new CelebrateError('Неверный URL');
        }
        return url;
      }),
  }),
});

router.get('/', getUsers);
router.get('/:id', validateUserId, getUser);
router.post('/', createUser);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
