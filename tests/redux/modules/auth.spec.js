import {
  LOGIN,
  REGISTER,
  login,
  register,
  initialState,
  default as authReducer
} from 'routes/Auth/modules/Auth'

describe('(Redux Module) Auth', () => {
  it('Should export a constant LOGIN', () => {
    expect(LOGIN).to.equal('LOGIN')
  })

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(authReducer).to.be.a('function')
    })

    it('Should initialize with the initial state', () => {
      expect(authReducer(undefined, {})).to.deep.equal(initialState)
    })
  })

  describe('(Action Creator) login', () => {
    it('Should be exported as a function', () => {
      expect(login).to.be.a('function')
    })

    it('Should return a function', () => {
      expect(login()).to.be.a('function')
    })
  })

  describe('(Action Creator) register', () => {
    it('Should be exported as a function', () => {
      expect(register).to.be.a('function')
    })

    it('Should return a functon', () => {
      expect(register()).to.be.a('function')
    })
  })
})
