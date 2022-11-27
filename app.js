const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { constants } = require('http2');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6382325007b0b7ab8f1b424f',
  };

  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => res
  .status(constants.HTTP_STATUS_NOT_FOUND)
  .send({ message: 'Страница не найдена' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
