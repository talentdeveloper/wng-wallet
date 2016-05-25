import {
  generatePassphrase,
  encrypt,
  decrypt
} from 'redux/utils/crypto'

describe('(Redux Util) Crypto', () => {
  describe('(Function) generatePassphrase', () => {
    let _passphrase

    beforeEach(() => {
      _passphrase = generatePassphrase()
    })

    it('Should be a function', () => {
      expect(generatePassphrase).to.be.a('function')
    })

    it('Should generate a 64 bytes passphrase', () => {
      expect(_passphrase).to.have.length(64)
    })
  })

  describe('Encryption', () => {
    let _passphrase = generatePassphrase()
    let _key = JSON.stringify({
      username: 'username',
      email: 'email@email.com',
      password: 'password'
    })
    let _encryptedMessage
    let _decryptedMessage

    describe('(Function) encrypt', () => {
      it('Should be a function', () => {
        expect(encrypt).to.be.a('function')
      })

      it('Should return an object with nonce and message', () => {
        _encryptedMessage = encrypt(_passphrase, _key)
        expect(_encryptedMessage).to.be.a('object')
        expect(_encryptedMessage).to.have.all.keys(['nonce', 'message'])
      })
    })

    describe('(Function) decrypt', () => {
      it('Should be a function', () => {
        expect(decrypt).to.be.a('function')
      })

      it('Should decrypt the encrypted message', () => {
        _decryptedMessage = decrypt(_encryptedMessage, _key)
        expect(_decryptedMessage).equal(_passphrase)
      })
    })
  })
})
