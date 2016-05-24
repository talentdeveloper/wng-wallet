import {
  generatePassphrase
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
})
