import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import {
  generateSecretPhrase,
  encrypt,
  decrypt
} from 'redux/utils/crypto'
import {
  getAccountRSFromSecretPhrase
} from 'redux/utils/cryptoOld'
import {
  storeSecretPhrase,
  getSecretPhrase
} from 'redux/utils/storage'

export const LOGIN = 'LOGIN'
export const login = (data) => {
  return dispatch => {
    dispatch(createAction(LOGIN)())
    const encrypted = getSecretPhrase(data.username)
    if (!encrypted) {
      return dispatch(loginError())
    }

    const decrypted = decrypt(encrypted, JSON.stringify(data))
    if (!decrypted) {
      return dispatch(loginError())
    }

    const account = {
      secretPhrase: decrypted,
      accountRS: getAccountRSFromSecretPhrase(decrypted)
    }

    dispatch(loginSuccess(account))
    dispatch(push('/'))
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = createAction(LOGIN_SUCCESS)

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginError = createAction(LOGIN_ERROR)

export const REGISTER = 'REGISTER'
export const register = (data) => {
  return dispatch => {
    dispatch(createAction(REGISTER)())
    const passphrase = generateSecretPhrase()
    const encrypted = encrypt(passphrase, JSON.stringify(data))
    if (storeSecretPhrase(data.username, encrypted)) {
      dispatch(registerSuccess(passphrase))
      dispatch(push('/login'))
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
  isLoggingIn: false,
  isRegistering: false,
  secretPhrase: '',
  accountRS: ''
}

export default handleActions({
  [LOGIN]: state => {
    return {
      ...state,
      secretPhrase: '',
      isLoggingIn: true
    }
  },

  [LOGIN_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isLoggingIn: false,
      secretPhrase: payload.secretPhrase,
      accountRS: payload.accountRS
    }
  },

  [LOGIN_ERROR]: state => {
    return {
      ...state,
      isLoggingIn: false
    }
  },

  [REGISTER]: state => {
    return {
      ...state,
      isRegistering: true
    }
  },

  [REGISTER_SUCCESS]: state => {
    return {
      ...state,
      isRegistering: false
    }
  },

  [REGISTER_ERROR]: state => {
    return {
      ...state,
      isRegistering: false
    }
  }
}, initialState)
