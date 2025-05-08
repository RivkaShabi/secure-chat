const CryptoJS = require('crypto-js');

const AES_SECRET = '1234567890123456';

const encryptMessage = function (text) {
  return CryptoJS.AES.encrypt(text, AES_SECRET).toString();
};

const decryptMessage = function (cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptMessage,
  decryptMessage,
};