import {
  LOGIN,
  REGISTER,
  login,
  register,
  initialState,
  default as authReducer
} from 'redux/modules/auth'

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

    it('Should return an action with type "LOGIN".', () => {
      expect(login()).to.have.property('type', LOGIN)
    })
  })

  describe('(Action Handler) login', () => {
    it('Should set the secretPhrase when logging in', () => {
      let state = authReducer(undefined, {})
      expect(state).to.deep.equal(initialState)
      state = authReducer(state, login('mySecretPhrase'))
      expect(state.secretPhrase).to.equal('mySecretPhrase')
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

  describe('(Action Handler) register', () => {
    let state = authReducer(undefined, {})
    expect(state).to.deep.equal(initialState)
    state = authReducer(state, register({
      username: 'username',
      email: 'email@email.com',
      password: 'mypassword'
    }))
  })
})
