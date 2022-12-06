const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { celebrateCreateUser, celebrateLoginUser } = require('./validators/users');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.post('/signin', celebrateLoginUser, login);
app.post('/signup', celebrateCreateUser, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
