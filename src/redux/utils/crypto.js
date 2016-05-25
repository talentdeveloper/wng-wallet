import crypto from 'crypto'
import nacl from 'tweetnacl'
import util from 'tweetnacl-util'
nacl.util = util

export function generatePassphrase () {
  const bytes = nacl.randomBytes(8) // 64 bytes, 8 * 8

  return crypto.createHash('sha256').update(bytes).digest('hex')
}

export function createKeyBytes (key) {
  // hash the key so we have 32 bytes key
  const hash = crypto.createHash('sha256').update(key).digest('base64')
  // convert key into bytes
  return nacl.util.decodeBase64(hash)
}

/**
 * Encrypt the message with the given key
 * @param  {string} message
 * @param  {string} key
 * @return {object} object
 */
export function encrypt (message, key) {
  // convert message to bytes
  const messageBytes = nacl.util.decodeUTF8(message)
  // generate 24 byte nonce
  const nonceBytes = nacl.randomBytes(24)
  // generate key bytes
  const keyBytes = createKeyBytes(key)
  // encrypt
  const encryptedBytes = nacl.secretbox(messageBytes, nonceBytes, keyBytes)

  return {
    nonce: nacl.util.encodeBase64(nonceBytes),
    message: nacl.util.encodeBase64(encryptedBytes)
  }
}

/**
 * Decrypt the given message object and return the UTF8 string
 * @param  {object} encrypted
 * @param  {string} key
 * @return {string} decrypted message
 */
export function decrypt (encrypted, key) {
  // convert message to bytes
  const messageBytes = nacl.util.decodeBase64(encrypted.message)
  // convert key into bytes
  const keyBytes = createKeyBytes(key)
  // convert nonce to bytes
  const nonceBytes = nacl.util.decodeBase64(encrypted.nonce)
  // decrypt
  const decryptedBytes = nacl.secretbox.open(messageBytes, nonceBytes, keyBytes)
  // return encoded UTF8 string
  return nacl.util.encodeUTF8(decryptedBytes)
}
