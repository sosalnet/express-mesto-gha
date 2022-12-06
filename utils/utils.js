const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const emailRegex = /^[a-z0-9-]+@[a-z0-9-.]+/i;

module.exports = { emailRegex, urlRegex };
