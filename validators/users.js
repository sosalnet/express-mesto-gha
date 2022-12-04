const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../utils/utils');

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object.keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.celebrateLoginUser = celebrate({
  body: Joi.object.keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.celebrateEditAvatar = celebrate({
  body: Joi.object.keys({
    avatar: Joi.string().regex(urlRegex),
  }),
});

module.exports.celebrateEditUser = celebrate({
  body: Joi.object.keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.celebrateIdUser = celebrate({
  params: Joi.object({
    userId: Joi.alternatives().try(
      Joi.string().equal('me'),
      Joi.string().hex().length(24).required,
    ).required(),
  }).required(),
});
