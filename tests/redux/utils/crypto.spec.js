import {
  generateSecretPhrase,
  encrypt,
  decrypt
} from 'redux/utils/crypto'

describe('(Redux Util) Crypto', () => {
  describe('(Function) generateSecretPhrase', () => {
    let _secretPhrase

    beforeEach(() => {
      _secretPhrase = generateSecretPhrase()
    })

    it('Should be a function', () => {
      expect(generateSecretPhrase).to.be.a('function')
    })

    it('Should generate a 64 bytes secretPhrase', () => {
      expect(_secretPhrase).to.have.length(64)
    })
  })

  describe('Encryption', () => {
    let _secretPhrase = generateSecretPhrase()
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
        _encryptedMessage = encrypt(_secretPhrase, _key)
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
        expect(_decryptedMessage).equal(_secretPhrase)
      })
    })
  })
})
