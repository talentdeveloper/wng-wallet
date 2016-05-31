import { createAction, handleActions } from 'redux-actions'
import { sendRequest } from 'redux/utils/api'
import { convertToNQT } from 'redux/utils/nrs'

export const SEND_MONEY = 'SEND_MONEY'
export const sendMoney = (data) => {
  return (dispatch, getState) => {
    dispatch(createAction(SEND_MONEY)())
    const { secretPhrase } = getState().auth.account

    return sendRequest('sendMoney', {
      recipient: data.recipient,
      amountNQT: convertToNQT(data.amount),
      secretPhrase
    }).then(function (result) {
      console.log(result)
      dispatch(sendMoneySuccess())
    })
  }
}

export const SEND_MONEY_SUCCESS = 'SEND_MONEY_SUCCESS'
export const sendMoneySuccess = createAction(SEND_MONEY_SUCCESS)

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const getTransactions = (account) => {
  return dispatch => {
    dispatch(createAction(GET_TRANSACTIONS)())

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
  isRetrievingTransactions: false,
  transactions: [],
  showModal: false,
  modalTitle: 'send_currency'
}

export default handleActions({
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
      ...state,
      showModal: false
    }
  }
}, initialState)
