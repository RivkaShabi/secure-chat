const { encryptMessage, decryptMessage } = require('../src/utils/crypto');

describe('Encryption / Decryption', () => {
  it('should encrypt and decrypt correctly', () => {
    const message = 'Hello World';
    const key = 'secretKey';

    const encrypted = encryptMessage(message, key);
    const decrypted = decryptMessage(encrypted, key);

    expect(typeof encrypted).toBe('string');
    expect(decrypted).toBe(message);
  });
});
