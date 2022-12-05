const urlRegex = /^https?:\/\/(www\.)?[A-Za-z\0-9]+\.[-._~:/?#[\]@!$&'()*+,;=]#?$/;
const emailRegex = /^\w+@\w+/i;

module.exports = { emailRegex, urlRegex };
