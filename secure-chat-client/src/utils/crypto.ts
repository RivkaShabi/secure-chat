import CryptoJS from 'crypto-js';

export const generateRSAKeys = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );

  const publicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKey: btoa(String.fromCharCode(...Array.from(new Uint8Array(publicKey)))),
    privateKey: btoa(String.fromCharCode(...Array.from(new Uint8Array(privateKey)))),
  };
};

const AES_SECRET = '1234567890123456';

export const encryptMessage = (text: string): string => {
  return CryptoJS.AES.encrypt(text, AES_SECRET).toString();
};

export const decryptMessage = (cipher: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipher, AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
