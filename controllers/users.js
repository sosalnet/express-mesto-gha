const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => console.log(err));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка прочтения пользователя' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не обнаружен' });
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
          .send({ message: 'Ошибка поиска пользователя' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка создания пользователя' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не обнаружен' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка обновления пользователя' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не обнаружен' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы неверные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка обновления аватара' });
      }
    });
};
