import { createAction, handleActions } from 'redux-actions'
import {
  generatePassphrase,
  encrypt,
  decrypt
} from 'redux/utils/crypto'

export const LOGIN = 'LOGIN'
export const login = createAction(LOGIN)

export const REGISTER = 'REGISTER'
export const register = (data) => {
  return dispatch => {
    dispatch(createAction(REGISTER)())
    const passphrase = generatePassphrase()
    const encrypted = encrypt(passphrase, JSON.stringify(data))
    const decrypted = decrypt(encrypted, JSON.stringify(data))
    console.log(data)
    console.log(passphrase)
    console.log(encrypted)
    console.log(decrypted)
  }
}

export const initialState = {
  isRegistering: false,
  secretPhrase: ''
}

export default handleActions({
  [LOGIN]: (state, { payload }) => {
    return {
      ...state,
      secretPhrase: payload
    }
  },

  [REGISTER]: state => {
    return {
      ...state,
      isRegistering: true
    }
  }
}, initialState)
