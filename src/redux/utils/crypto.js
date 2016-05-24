import sjcl from 'sjcl'

export function generatePassphrase () {
  sjcl.random = new sjcl.prng(10) // eslint-disable-line

  var ab = new Uint32Array(32)
  var crypto = window.crypto || window.msCrypto
  crypto.getRandomValues(ab)
  sjcl.random.addEntropy(ab, 1024, 'crypto.getRandomValues')

  var bytes = sjcl.random.randomWords(8, 10) // 64 bytes, 8 * 8

  return sjcl.codec.hex.fromBits(bytes)
}
