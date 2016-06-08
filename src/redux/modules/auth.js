import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import {
  generateSecretPhrase,
  encrypt,
  decrypt
} from 'redux/utils/crypto'
import {
  getAccountRSFromSecretPhrase,
  getPublicKey
} from 'redux/utils/cryptoOld'
import {
  storeSecretPhrase,
  getSecretPhrase
} from 'redux/utils/storage'
import { getTransactions } from 'redux/modules/transaction'
import { get, post, sendRequest } from 'redux/utils/api'

export const LOGIN = 'LOGIN'
export const login = (data) => {
  return dispatch => {
    dispatch(createAction(LOGIN)())

    const handleDecryption = (encrypted) => {
      const decrypted = decrypt(encrypted, JSON.stringify(data))
      if (!decrypted) {
        return dispatch(loginError('could_not_decrypt'))
      }

      const accountData = {
        secretPhrase: decrypted,
        accountRS: getAccountRSFromSecretPhrase(decrypted),
        publicKey: getPublicKey(decrypted)
      }

      dispatch(loginSuccess(accountData))
      dispatch(push('/'))
      dispatch(getAccount(accountData.accountRS))
      dispatch(getTransactions(accountData.accountRS))
    }

    get('account', {
      username: data.username,
      email: data.email
    }).then((result) => {
      const encrypted = result.user.secretPhrase
      handleDecryption(encrypted)
    }).fail((jqXHR, textStatus, err) => {
      const encrypted = getSecretPhrase(data.username)
      if (!encrypted) {
        return dispatch(loginError('could_not_find_secretphrase'))
      }
      handleDecryption(encrypted)
    })
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
    const secretPhrase = generateSecretPhrase()
    const encrypted = encrypt(secretPhrase, JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password
    }))
    if (storeSecretPhrase(data.username, encrypted)) {
      post('register', {
        username: data.username,
        email: data.email,
        secretPhrase: JSON.stringify(encrypted),
        accountRS: getAccountRSFromSecretPhrase(secretPhrase)
      }).then((result) => {
        dispatch(registerSuccess(data))
        dispatch(push('/login'))
      }).fail((jqXHR, textStatus, err) => {
        dispatch(registerError('username_email_exists'))
      })
    } else {
      dispatch(registerError('username_email_exists'))
    }
  }
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const registerSuccess = createAction(REGISTER_SUCCESS)

export const REGISTER_ERROR = 'REGISTER_ERROR'
export const registerError = createAction(REGISTER_ERROR)

export const GET_ACCOUNT = 'GET_ACCOUNT'
export const getAccount = (account) => {
  return dispatch => {
    dispatch(createAction(GET_ACCOUNT)())
    sendRequest('getAccount', {
      account
    }).then((result) => {
      console.log(result)
      dispatch(getAccountSuccess({
        unconfirmedBalanceNQT: result.unconfirmedBalanceNQT
      }))
    })
  }
}

export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS'
export const getAccountSuccess = createAction(GET_ACCOUNT_SUCCESS)

export const GET_ACCOUNT_ERROR = 'GET_ACCOUNT_ERROR'
export const getAccountError = createAction(GET_ACCOUNT_ERROR)

export const SHOW_RECEIVE_MODAL = 'SHOW_RECEIVE_MODAL'
export const showReceiveModal = createAction(SHOW_RECEIVE_MODAL)

export const HIDE_RECEIVE_MODAL = 'HIDE_RECEIVE_MODAL'
export const hideReceiveModal = createAction(HIDE_RECEIVE_MODAL)

export const initialState = {
  isLoggingIn: false,
  isRegistering: false,
  isRetrievingAccount: false,
  loginError: '',
  registerSuccess: false,
  registerError: '',
  showReceiveModal: false,
  account: {
    secretPhrase: '',
    accountRS: '',
    publicKey: '',
    unconfirmedBalanceNQT: 0
  },
  username: ''
}

export default handleActions({
  [LOGIN]: state => {
    return {
      ...state,
      isLoggingIn: true,
      loginError: '',
      account: {
        ...state.account,
        secretPhrase: ''
      }
    }
  },

  [LOGIN_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isLoggingIn: false,
      account: {
        ...state.account,
        secretPhrase: payload.secretPhrase,
        accountRS: payload.accountRS,
        publicKey: payload.publicKey
      }
    }
  },

  [LOGIN_ERROR]: (state, { payload }) => {
    return {
      ...state,
      isLoggingIn: false,
      loginError: payload
    }
  },

  [REGISTER]: state => {
    return {
      ...state,
      isRegistering: true,
      registerError: ''
    }
  },

  [REGISTER_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isRegistering: false,
      registerSuccess: true,
      username: payload.username,
      email: payload.email
    }
  },

  [REGISTER_ERROR]: (state, { payload }) => {
    return {
      ...state,
      isRegistering: false,
      registerError: payload
    }
  },

  [GET_ACCOUNT]: state => {
    return {
      ...state,
      isRetrievingAccount: true
    }
  },

  [GET_ACCOUNT_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isRetrievingAccount: false,
      account: {
        ...state.account,
        unconfirmedBalanceNQT: payload.unconfirmedBalanceNQT
      }
    }
  },

  [GET_ACCOUNT_ERROR]: state => {
    return {
      ...state,
      isRetrievingAccount: false
    }
  },

  [SHOW_RECEIVE_MODAL]: state => {
    return {
      ...state,
      showReceiveModal: true
    }
  },

  [HIDE_RECEIVE_MODAL]: state => {
    return {
      ...state,
      showReceiveModal: false
    }
  }
}, initialState)
