import {
  storeSecretPhrase,
  getSecretPhrase
} from 'redux/utils/storage'

describe('(Redux Util) Storage', () => {
  let _secretPhrase = {
    nonce: 'mynonce',
    message: 'mymessage'
  }
  describe('(Function) storeSecretPhrase', () => {
    it('Should be a function', () => {
      expect(storeSecretPhrase).to.be.a('function')
    })

    it('Should store the secretPhrase', () => {
      const isStored = storeSecretPhrase('myusername', _secretPhrase)
      expect(isStored).to.equal(true)
      const stored = JSON.parse(localStorage.getItem('myusername_secretPhrase'))
      expect(stored).to.deep.equal(_secretPhrase)
    })
  })

  describe('(Function) getSecretPhrase', () => {
    it('Should be a function', () => {
      expect(getSecretPhrase).to.be.a('function')
    })

    it('Should retrieve secretPhrase', () => {
      const stored = getSecretPhrase('myusername')
      expect(stored).to.deep.equal(_secretPhrase)
    })
  })

  localStorage.removeItem('myusername_secretPhrase')
})
