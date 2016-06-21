import { sendRequest } from './api'
import NxtAddress from './nxtAddress'

/* eslint-disable */
/**
 * Encrypt the secretphrase using AES for secure storage
 * @param  {string} secretphrase
 * @param  {object} key
 * @return {bool}
 */
export function encryptSecretPhrase(secretphrase, key) {
  key = JSON.stringify(key);
  key = CryptoJS.SHA256(key).toString();

  try {
    return CryptoJS.AES.encrypt(secretphrase, key).toString();
  } catch (e) {
    return e;
  }
}

/**
 * Decrypt the secretphrase using the user provided key
 * @param  {string} encryptedSecretPhrase
 * @param  {string} key
 * @return {string} secretphrase
 */
export function decryptSecretPhrase (encryptedSecretPhrase, key) {
  key = JSON.stringify(key);
  key = CryptoJS.SHA256(key).toString();

  try {
    return CryptoJS.AES.decrypt(encryptedSecretPhrase, key).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
}

/**
 * Get the public key belonging to the secretphrase or accountNumber
 * @param  {string}  secretphrase or accountNumber
 * @param  {Boolean} isAccountNumber
 * @return {string} publicKey
 */
export function getPublicKey(secretphrase, isAccountNumber) {
  if (isAccountNumber) {
    var accountNumber = secretphrase;
    var publicKey = '';

    // synchronous
    sendRequest('getAccountPublicKey', {
      account: accountNumber
    }, false).then(function(response) {
      if (response.publicKey) {
        publicKey = response.publicKey;
      }
    });

    return publicKey;
  } else {
    secretphrase = converters.stringToHexString(secretphrase);
    var secretphraseBytes = converters.hexStringToByteArray(secretphrase);
    var digest = simpleHash(secretphraseBytes);
    return converters.byteArrayToHexString(curve25519.keygen(digest).p);
  }
}

/**
 * Get the accountId in numeric or Reed Solomon format from the public keygen
 * @param  {string} publicKey
 * @param  {bool} RSFormat return accountIn in Reed Solomon or not
 * @return {string} accountId
 */
export function getAccountIdFromPublicKey(publicKey, RSFormat) {
  if (!publicKey) return;
  var hex = converters.hexStringToByteArray(publicKey);
  var account = simpleHash(hex);

  account = converters.byteArrayToHexString(account);

  var slice = (converters.hexStringToByteArray(account)).slice(0, 8);

  var accountId = byteArrayToBigInteger(slice).toString();

  if (RSFormat) {
    var address = new NxtAddress();

    if (address.set(accountId)) {
      return address.toString();
    } else {
      return '';
    }
  } else {
    return accountId;
  }
}

/**
 * Get the accountId in Reed Solomon format based on secretphrase
 * @param  {string} secretphrase
 * @return {string} accountId
 */
export function getAccountRSFromSecretPhrase(secretphrase) {
  const publicKey = getPublicKey(secretphrase);

  return getAccountIdFromPublicKey(publicKey, true);
}

// SHA256 hash
export function simpleHash(b1, b2) {
  var sha256 = CryptoJS.algo.SHA256.create();
  sha256.update(converters.byteArrayToWordArray(b1));
  if (b2) {
    sha256.update(converters.byteArrayToWordArray(b2));
  }
  var hash = sha256.finalize();
  return converters.wordArrayToByteArrayImpl(hash, false);
}

/**
 * Get the private key from the secretphrase
 * @param  {string} secretphrase
 * @return {string} privateKey
 */
function getPrivateKey(secretphrase) {
  var bytes = simpleHash(converters.stringToByteArray(secretphrase));
  return converters.shortArrayToHexString(curve25519_clamp(converters.byteArrayToShortArray(bytes)));
}

/**
 * Decrypt data using the shared key
 * @param  {string} data    encrypted data
 * @param  {object} options object containing privateKey and publicKey or sharedKey
 * @return {string} decryptedData
 */
function decryptData(data, options) {
  if (!options.sharedKey) {
    options.sharedKey = getSharedKey(options.privateKey, options.publicKey);
  }

  var compressedPlaintext = aesDecrypt(data, options);
  var binData = new Uint8Array(compressedPlaintext);
  return converters.byteArrayToString(pako.inflate(binData));
}

/**
 * Get shared key using curve25519
 * @param  {string} key1
 * @param  {string} key2
 * @return {array} byteArray
 */
function getSharedKey(key1, key2) {
  return converters.shortArrayToByteArray(curve25519_(converters.byteArrayToShortArray(key1), converters.byteArrayToShortArray(key2), null));
}

/**
 * Decrypt AES encrypted data
 * @param  {string} ivCiphertext
 * @param  {object} options object containing privateKey and publicKey or sharedKey
 * @return {string} encryptedData
 */
function aesDecrypt(ivCiphertext, options) {
  if (ivCiphertext.length < 16 || ivCiphertext.length % 16 != 0) {
    throw {
      name: 'invalid ciphertext'
    };
  }

  var iv = converters.byteArrayToWordArray(ivCiphertext.slice(0, 16));
  var ciphertext = converters.byteArrayToWordArray(ivCiphertext.slice(16));
  var sharedKey;
  if (!options.sharedKey) {
    sharedKey = getSharedKey(options.privateKey, options.publicKey);
  } else {
    sharedKey = options.sharedKey.slice(0); //clone
  }

  for (var i = 0; i < 32; i++) {
    sharedKey[i] ^= options.nonce[i];
  }

  var key = CryptoJS.SHA256(converters.byteArrayToWordArray(sharedKey));

  var encrypted = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertext,
    iv: iv,
    key: key
  });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv
  });

  return converters.wordArrayToByteArray(decrypted);
}

/**
 * Encrypt plain text using AES
 * @param  {string} plaintext
 * @param  {object} options object containing nonce, privateKey and publicKey or sharedKey
 * @return {string} encryptedData
 */
function aesEncrypt(plaintext, options) {
  // CryptoJS likes WordArray parameters
  var text = converters.byteArrayToWordArray(plaintext);
  var sharedKey;
  if (!options.sharedKey) {
    sharedKey = getSharedKey(options.privateKey, options.publicKey);
  } else {
    sharedKey = options.sharedKey.slice(0); //clone
  }

  for (var i = 0; i < 32; i++) {
    sharedKey[i] ^= options.nonce[i];
  }

  var key = CryptoJS.SHA256(converters.byteArrayToWordArray(sharedKey));

  var tmp = new Uint8Array(16);

  if (window.crypto) {
    window.crypto.getRandomValues(tmp);
  } else {
    window.msCrypto.getRandomValues(tmp);
  }

  var iv = converters.byteArrayToWordArray(tmp);
  var encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv
  });

  var ivOut = converters.wordArrayToByteArray(encrypted.iv);

  var ciphertextOut = converters.wordArrayToByteArray(encrypted.ciphertext);

  return ivOut.concat(ciphertextOut);
}

/**
 * Encrypt plain text using AES, generates nonce and compresses data
 * @param  {string} plaintext
 * @param  {object} options object containing privateKey and publicKey or sharedKey
 * @return {string} encryptedData
 */
function encryptData(plaintext, options) {
  if (!options.sharedKey) {
    options.sharedKey = getSharedKey(options.privateKey, options.publicKey);
  }

  var compressedPlaintext = pako.gzip(new Uint8Array(plaintext));

  options.nonce = new Uint8Array(32);

  if (window.crypto) {
    //noinspection JSUnresolvedFunction
    window.crypto.getRandomValues(options.nonce);
  } else {
    //noinspection JSUnresolvedFunction
    window.msCrypto.getRandomValues(options.nonce);
  }

  var data = aesEncrypt(compressedPlaintext, options);

  return {
    nonce: options.nonce,
    data: data
  };
}

/**
 * Encrypt a message to store on the blockchain
 * @param  {string} message    plain text message
 * @param  {object} options    contains privateKey/publicKey or accountId
 * @param  {string} secretphrase optional if privateKey supplied in options
 * @return {object}            contains message and nonce for blockchain storage
 */
export function encryptMessage(message, options, secretphrase) {
  if (!options.privateKey) {
    options.privateKey = converters.hexStringToByteArray(getPrivateKey(secretphrase));
  }

  if (!options.publicKey) {
    options.publicKey = converters.hexStringToByteArray(getPublicKey(options.account, true));
  }

  var encrypted = encryptData(converters.stringToByteArray(message), options);

  return {
    message: converters.byteArrayToHexString(encrypted.data),
    nonce: converters.byteArrayToHexString(encrypted.nonce)
  };
}

/**
 * Decrypt a blockchain message from the blockchain
 * @param  {string} message    plain text message
 * @param  {object} options    contains privateKey/publicKey or accountId
 * @param  {string} secretphrase optional if privateKey supplied in options
 * @return {string}            decrypted message
 */
export function decryptMessage(message, options, secretphrase) {
  if (!options.privateKey) {
    options.privateKey = converters.hexStringToByteArray(getPrivateKey(secretphrase));
  }

  if (!options.publicKey) {
    options.publicKey = converters.hexStringToByteArray(getPublicKey(options.account, true));
  }

  options.nonce = converters.hexStringToByteArray(options.nonce);

  return decryptData(converters.hexStringToByteArray(message), options);
}

/**
 * Takes blockchain transaction and decrypts message
 * @param  {object} transaction blockchain transaction object
 * @param  {string} secretphrase
 * @param  {string} accountRS   accountId in Reed Solomon format
 * @return {string}             JSON parsed decrypted message
 */
export function decryptTransaction(transaction, secretphrase, accountRS) {
  let message = transaction.attachment.encryptedMessage;

  // we need to use the other account to decrypt
  let otherAccount = transaction.recipient;
  if (transaction.recipientRS === accountRS) {
    otherAccount = transaction.sender;
  }

  let decryptedMessage = decryptMessage(message.data, {
    nonce: message.nonce,
    account: otherAccount
  }, secretphrase);

  try {
    return JSON.parse(decryptedMessage);
  } catch (e) {
    return null;
  }
}

/**
 * Sign transaction bytes to broadcast on blockchain
 * @param  {string} message
 * @param  {string} secretphrase
 * @return {string} signed transaction bytes
 */
export function signBytes(message, secretphrase) {
  secretphrase = converters.stringToHexString(secretphrase);
  var messageBytes = converters.hexStringToByteArray(message);
  var secretphraseBytes = converters.hexStringToByteArray(secretphrase);

  var digest = simpleHash(secretphraseBytes);
  var s = curve25519.keygen(digest).s;
  var m = simpleHash(messageBytes);
  var x = simpleHash(m, s);
  var y = curve25519.keygen(x).p;
  var h = simpleHash(m, y);
  var v = curve25519.sign(h, x, s);
  return converters.byteArrayToHexString(v.concat(h));
}

/* eslint-enable */
