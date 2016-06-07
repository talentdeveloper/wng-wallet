import { createAction, handleActions } from 'redux-actions'
import { sendRequest } from 'redux/utils/api'
import { convertToNQT } from 'redux/utils/nrs'

export const SET_STEP = 'SET_STEP'
export const setStep = createAction(SET_STEP)

export const SEND_MONEY = 'SEND_MONEY'
export const sendMoney = (data) => {
  return (dispatch, getState) => {
    dispatch(createAction(SEND_MONEY)())
    const { secretPhrase } = getState().auth.account

    return sendRequest('sendMoney', {
      recipient: data.recipient,
      amountNQT: convertToNQT(data.amount),
      secretPhrase
    }).then((result) => {
      console.log(result)
      dispatch(sendMoneySuccess())
    }).fail((jqXHR, textStatus, err) => {
      dispatch(sendMoneyError(err))
    })
  }
}

export const SEND_MONEY_SUCCESS = 'SEND_MONEY_SUCCESS'
export const sendMoneySuccess = createAction(SEND_MONEY_SUCCESS)

export const SEND_MONEY_ERROR = 'SEND_MONEY_ERROR'
export const sendMoneyError = createAction(SEND_MONEY_ERROR)

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const getTransactions = (account) => {
  return (dispatch, getState) => {
    dispatch(createAction(GET_TRANSACTIONS)())

    if (!account) {
      account = getState().auth.account.accountRS
    }

    sendRequest('getBlockchainTransactions', {
      account
    }).then((result) => {
      dispatch(getTransactionsSuccess(result.transactions))
    })
  }
}

export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export const getTransactionsSuccess = createAction(GET_TRANSACTIONS_SUCCESS)

export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'
export const getTransactionsError = createAction(GET_TRANSACTIONS_ERROR)

export const SHOW_MODAL = 'SHOW_MODAL'
export const showModal = createAction(SHOW_MODAL)

export const HIDE_MODAL = 'HIDE_MODAL'
export const hideModal = createAction(HIDE_MODAL)

const initialState = {
  isSending: false,
  sendSuccess: false,
  sendError: '',
  sendStep: 0,
  isRetrievingTransactions: false,
  transactions: [],
  showModal: false,
  modalTitle: 'send_currency'
}

export default handleActions({
  [SET_STEP]: (state, { payload }) => {
    return {
      ...state,
      sendStep: payload
    }
  },

  [SEND_MONEY]: state => {
    return {
      ...state,
      isSending: true,
      sendSuccess: false
    }
  },

  [SEND_MONEY_SUCCESS]: state => {
    return {
      ...state,
      isSending: false,
      sendSuccess: true
    }
  },

  [SEND_MONEY_ERROR]: (state, { payload }) => {
    return {
      ...state,
      isSending: false,
      sendSuccess: false,
      sendError: payload
    }
  },

  [GET_TRANSACTIONS]: state => {
    return {
      ...state,
      isRetrievingTransactions: true
    }
  },

  [GET_TRANSACTIONS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      transactions: payload,
      isRetrievingTransactions: false
    }
  },

  [SHOW_MODAL]: (state, { payload }) => {
    return {
      ...state,
      showModal: true,
      modalTitle: payload || state.modalTitle
    }
  },

  [HIDE_MODAL]: state => {
    return {
      ...initialState,
      transactions: state.transactions
    }
  }
}, initialState)