const urlRegex = /^https?:\/\/(www\.)?[A-Za-z\0-9]+\.[-._~:/?#[\]@!$&'()*+,;=]#?$/;
const emailRegex = /^[a-z0-9-]+@[a-z0-9-.]+/i;

module.exports = { emailRegex, urlRegex };
