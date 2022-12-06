const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/utils');

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.celebrateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.celebrateEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }).required(),
  }),
});

module.exports.celebrateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.celebrateIdUser = celebrate({
  params: Joi.object({
    userId: Joi.alternatives().try(
      Joi.string().hex().length(24).required(),
    ).required(),
  }).required(),
});
