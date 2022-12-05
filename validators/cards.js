const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../utils/utils');

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }).required(),
  }),
});

module.exports.celebrateIdCard = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});
