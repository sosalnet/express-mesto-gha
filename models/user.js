const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const emailRegex = /^\w+@\w+/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => emailRegex.test(email),
      message: () => 'Введите сущесестующиц email в формате ivan@ivanov.ru',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((info) => {
      if (!info) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, info.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          const user = info.toObject();
          delete user.password;
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
