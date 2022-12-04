const { constants } = require('http2');
const HTTPError = require('./HTTPError');

class ForbiddenError extends HTTPError {
  constructor(message = '') {
    super(message, constants.HTTP_STATUS_FORBIDDEN);
  }
}

module.exports = ForbiddenError;
