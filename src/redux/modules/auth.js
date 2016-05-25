import { createAction, handleActions } from 'redux-actions'
import {
  generatePassphrase,
  encrypt,
  decrypt
} from 'redux/utils/crypto'
import {
  storePassphrase,
  getPassphrase
} from 'redux/utils/storage'

export const LOGIN = 'LOGIN'
export const login = createAction(LOGIN)

export const REGISTER = 'REGISTER'
export const register = (data) => {
  return dispatch => {
    dispatch(createAction(REGISTER)())
    const passphrase = generatePassphrase()
    const encrypted = encrypt(passphrase, JSON.stringify(data))
    if (storePassphrase(data.username, encrypted)) {
      dispatch(registerSuccess(passphrase))
    } else {
      dispatch(registerError('username_exists'))
    }
  }
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const registerSuccess = createAction(REGISTER_SUCCESS)

export const REGISTER_ERROR = 'REGISTER_ERROR'
export const registerError = createAction(REGISTER_ERROR)

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
