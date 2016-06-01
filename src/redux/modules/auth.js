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
import { getTransactions } from 'redux/modules/transaction'
import { get, post, sendRequest } from 'redux/utils/api'

export const LOGIN = 'LOGIN'
export const login = (data) => {
  return dispatch => {
    dispatch(createAction(LOGIN)())

    const handleDecryption = (encrypted) => {
      const decrypted = decrypt(encrypted, JSON.stringify(data))
      if (!decrypted) {
        return dispatch(loginError())
      }

      const accountData = {
        secretPhrase: decrypted,
        accountRS: getAccountRSFromSecretPhrase(decrypted)
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
    const encrypted = encrypt(secretPhrase, JSON.stringify(data))
    if (storeSecretPhrase(data.username, encrypted)) {
      post('register', {
        username: data.username,
        email: data.email,
        secretPhrase: JSON.stringify(encrypted)
      }).then((result) => {
        dispatch(registerSuccess(secretPhrase))
        dispatch(push('/login'))
      }).fail((jqXHR, textStatus, err) => {
        dispatch(registerError(err))
      })
    } else {
      dispatch(registerError('username_exists'))
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

export const initialState = {
  isLoggingIn: false,
  isRegistering: false,
  isRetrievingAccount: false,
  account: {
    secretPhrase: '',
    accountRS: '',
    unconfirmedBalanceNQT: 0
  }
}

export default handleActions({
  [LOGIN]: state => {
    return {
      ...state,
      isLoggingIn: true,
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
        accountRS: payload.accountRS
      }
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
  }
}, initialState)
