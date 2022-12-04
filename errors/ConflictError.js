const { constants } = require('http2');
const HTTPError = require('./HTTPError');

class ConflictError extends HTTPError {
  constructor(message) {
    super(message, constants.HTTP_STATUS_CONFLICT);
  }
}

module.exports = ConflictError;
