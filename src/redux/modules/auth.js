import crypto from 'crypto'
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
import { connectionError } from 'redux/modules/site'
import { get, post, sendRequest } from 'redux/utils/api'
import { coin } from '../../../wallet.config.json'

export const LOGIN = 'LOGIN'
export const login = (data) => {
  return (dispatch, getState) => {
    dispatch(createAction(LOGIN)())

    const { importBackup, backupFile } = getState().auth

    const handleDecryption = (encrypted) => {
      let decrypted = decrypt(encrypted, JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      }))

      if (!decrypted) {
        decrypted = decrypt(encrypted, JSON.stringify({
          username: data.username.toLowerCase(),
          email: data.email.toLowerCase(),
          password: data.password
        }))
      }

      if (!decrypted) {
        return dispatch(loginError('could_not_decrypt'))
      }
      const accountRS = getAccountRSFromSecretPhrase(decrypted)
      const publicKey = getPublicKey(decrypted)
      const accountData = {
        encryptedSecretPhrase: encrypted,
        secretPhrase: decrypted,
        accountRS,
        publicKey,
        isAdmin: data.isAdmin
      }

      console.log(`Logged in account ${accountRS} with publicKey ${publicKey}`)

      const dispatchSuccess = (redirect = '/') => {
        dispatch(loginSuccess(accountData))
        dispatch(push(redirect))
        dispatch(getAccount(accountData.accountRS))
        dispatch(getTransactions(accountData.accountRS))
      }
      if (data.isAdmin) {
        return isAdmin(decrypted)
          .then(dispatchSuccess.bind(this, '/accounts'))
          .fail(() => {
            dispatch(loginError('is_not_admin'))
          })
      }

      dispatchSuccess()
    }

    if (importBackup && backupFile) {
      return handleDecryption(backupFile)
    }

    const username = crypto.createHash('sha256').update(data.username).digest('hex')

    get('account', {
      username,
      email: data.email
    }).then((result, textStatus, jqXHR) => {
      if (result && result.errorDescription) {
        return $.Deferred().reject(jqXHR, textStatus, result.errorDescription)
      }

      const encrypted = result.account.secretPhrase
      handleDecryption(encrypted)
    }).fail((jqXHR, textStatus, err) => {
      const encrypted = getSecretPhrase(username)
      if (!encrypted) {
        return dispatch(loginError('could_not_find_secretphrase'))
      }
      handleDecryption(encrypted)
    })
  }
}

export const isAdmin = (secretPhrase) => {
  return get('is-admin', {
    token: generateToken('admin', secretPhrase)
  }).then((result, textStatus, jqXHR) => {
    if (result.errorCode || result.errorDescription) {
      return $.Deferred().reject(jqXHR, textStatus, result.errorDescription)
    }
    return result
  })
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
      username: data.username.toLowerCase(),
      email: data.email.toLowerCase(),
      password: data.password
    }))
    const username = crypto.createHash('sha256').update(data.username).digest('hex')
    if (storeSecretPhrase(username, encrypted)) {
      post('register', {
        username: username,
        email: data.email.toLowerCase(),
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
      account,
      includeEffectiveBalance: true
    }).then((result) => {
      console.log(result)
      dispatch(getAccountSuccess({
        unconfirmedBalanceNQT: result.unconfirmedBalanceNQT || 0,
        effectiveBalance: result[`effectiveBalance${coin}`] || 0,
        forgedBalanceNQT: result.forgedBalanceNQT || 0
      }))
    }).fail(() => {
      dispatch(push('/login'))
      dispatch(connectionError())
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

export const TOGGLE_IMPORT_BACKUP = 'TOGGLE_IMPORT_BACKUP'
export const toggleImportBackup = createAction(TOGGLE_IMPORT_BACKUP)

export const SET_BACKUP_FILE = 'SET_BACKUP_FILE'
export const setBackupFile = createAction(SET_BACKUP_FILE)

export const SET_PASSWORD_STRENGTH = 'SET_PASSWORD_STRENGTH'
export const setPasswordStrength = createAction(SET_PASSWORD_STRENGTH)

export const initialState = {
  isLoggingIn: false,
  isRegistering: false,
  isRetrievingAccount: false,
  loginError: '',
  registerSuccess: false,
  registerError: '',
  showReceiveModal: false,
  account: {
    encryptedSecretPhrase: '',
    secretPhrase: '',
    accountRS: '',
    publicKey: '',
    unconfirmedBalanceNQT: 0
  },
  username: '',
  importBackup: false,
  backupFile: '',
  isAdmin: false,
  passwordStrength: 0
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
        encryptedSecretPhrase: payload.encryptedSecretPhrase,
        secretPhrase: payload.secretPhrase,
        accountRS: payload.accountRS,
        publicKey: payload.publicKey
      },
      isAdmin: payload.isAdmin
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
      registerError: '',
      loginError: ''
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
        unconfirmedBalanceNQT: payload.unconfirmedBalanceNQT,
        effectiveBalance: payload.effectiveBalance,
        forgedBalanceNQT: payload.forgedBalanceNQT
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
  },

  [TOGGLE_IMPORT_BACKUP]: state => {
    return {
      ...state,
      importBackup: !state.importBackup
    }
  },

  [SET_BACKUP_FILE]: (state, { payload }) => {
    return {
      ...state,
      backupFile: payload
    }
  },

  [SET_PASSWORD_STRENGTH]: (state, { payload }) => {
    return {
      ...state,
      passwordStrength: payload
    }
  }
}, initialState)
