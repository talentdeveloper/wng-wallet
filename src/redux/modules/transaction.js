import { createAction, handleActions } from 'redux-actions'
import { sendRequest } from 'redux/utils/api'

export const SEND_MONEY = 'SEND_MONEY'
export const sendMoney = (data) => {
  return (dispatch, getState) => {
    dispatch(createAction(SEND_MONEY)())
    const { secretPhrase } = getState().auth.account

    return sendRequest('sendMoney', {
      recipient: data.recipientRS,
      amount: 1e8,
      secretPhrase
    }).then(function (result) {
      console.log(result)
    })
  }
}

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

const initialState = {
  isSending: false,
  isRetrievingTransactions: false,
  transactions: []
}

export default handleActions({
  [SEND_MONEY]: state => {
    return {
      ...state,
      isSending: true
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
  }
}, initialState)
