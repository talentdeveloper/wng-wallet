import {
  storePassphrase,
  getPassphrase
} from 'redux/utils/storage'

describe('(Redux Util) Storage', () => {
  let _passphrase = {
    nonce: 'mynonce',
    message: 'mymessage'
  }
  describe('(Function) storePassphrase', () => {
    it('Should be a function', () => {
      expect(storePassphrase).to.be.a('function')
    })

    it('Should store the passphrase', () => {
      const isStored = storePassphrase('myusername', _passphrase)
      expect(isStored).to.equal(true)
      const stored = JSON.parse(localStorage.getItem('myusername_passphrase'))
      expect(stored).to.deep.equal(_passphrase)
    })
  })

  describe('(Function) getPassphrase', () => {
    it('Should be a function', () => {
      expect(getPassphrase).to.be.a('function')
    })

    it('Should retrieve passphrase', () => {
      const stored = getPassphrase('myusername')
      expect(stored).to.deep.equal(_passphrase)
    })
  })

  localStorage.removeItem('myusername_passphrase')
})
