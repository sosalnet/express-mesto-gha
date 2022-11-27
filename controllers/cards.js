const { constants } = require('http2');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка прочтения карточки' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка создания карточки' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Карточка не обнаруженa' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка поиска карточки' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Карточка не обнаруженa' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка постановки лайка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Карточка не обнаруженa' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка убирания лайка' });
      }
    });
};
