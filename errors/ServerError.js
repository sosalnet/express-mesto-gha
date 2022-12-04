const { constants } = require('http2');
const HTTPError = require('./HTTPError');

class ServerError extends HTTPError {
  constructor(message = '') {
    super(message, constants.HTTP_STATUS_SERVICE_UNAVAILABLE);
  }
}

module.exports = ServerError;
