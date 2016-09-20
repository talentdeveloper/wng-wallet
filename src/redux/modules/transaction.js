import { createAction, handleActions } from 'redux-actions'
import { sendRequest } from 'redux/utils/api'
import { convertToNQT } from 'redux/utils/nrs'

import { getAccount } from 'routes/Auth/modules/Auth'

export const SET_STEP = 'SET_STEP'
export const setStep = createAction(SET_STEP)

export const SEND_MONEY = 'SEND_MONEY'
export const sendMoney = (data) => {
  return (dispatch, getState) => {
    const { secretPhrase, accountRS } = getState().auth.account

    dispatch(createAction(SEND_MONEY)())
    return sendRequest('sendMoney', {
      recipient: data.recipient,
      amountNQT: convertToNQT(data.amount),
      secretPhrase
    }).then((result) => {
      console.log(result)
      dispatch(sendMoneySuccess())
      dispatch(getAccount(accountRS))
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

    const { limit, offset } = getState().transaction

    const requests = [
      sendRequest('getBlockchainTransactions', {
        account,
        firstIndex: offset,
        lastIndex: (offset + limit - 1)
      })
    ]

    if (offset === 0) {
      requests.push(sendRequest('getUnconfirmedTransactions', {
        account
      }))
    }

    Promise.all(requests).then((result) => {
      let transactions = []
      if (result[0] && result[0].transactions) {
        transactions = [
          ...transactions,
          ...result[0].transactions
        ]
      }

      if (result[1] && result[1].unconfirmedTransactions) {
        transactions = [
          ...result[1].unconfirmedTransactions,
          ...transactions
        ]
      }

      dispatch(getTransactionsSuccess(transactions.slice(0, 10)))
    })
  }
}

export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export const getTransactionsSuccess = createAction(GET_TRANSACTIONS_SUCCESS)

export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'
export const getTransactionsError = createAction(GET_TRANSACTIONS_ERROR)

export const NEXT_PAGE = 'TRANSACTIONS.NEXT_PAGE'
export const nextPage = createAction(NEXT_PAGE)

export const PREVIOUS_PAGE = 'TRANSACTIONS.PREVIOUS_PAGE'
export const previousPage = createAction(PREVIOUS_PAGE)

export const RESET_PAGINATION = 'TRANSACTIONS.RESET_PAGINATION'
export const resetPagination = createAction(RESET_PAGINATION)

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
  modalTitle: 'send_currency',
  recipient: '',
  limit: 10,
  offset: 0
}

export default handleActions({
  [SET_STEP]: (state, { payload }) => {
    return {
      ...state,
      sendStep: payload,
      sendSuccess: false,
      sendError: ''
    }
  },

  [SEND_MONEY]: state => {
    return {
      ...state,
      isSending: true,
      sendSuccess: false,
      sendError: ''
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

  [NEXT_PAGE]: state => {
    return {
      ...state,
      offset: state.offset + state.limit
    }
  },

  [PREVIOUS_PAGE]: state => {
    return {
      ...state,
      offset: state.offset - state.limit
    }
  },

  [RESET_PAGINATION]: state => {
    return {
      ...state,
      offset: 0
    }
  },

  [SHOW_MODAL]: (state, { payload }) => {
    return {
      ...state,
      showModal: true,
      modalTitle: payload && payload.modalTitle ? payload.modalTitle : state.modalTitle,
      recipient: payload && payload.recipient ? payload.recipient : ''
    }
  },

  [HIDE_MODAL]: state => {
    return {
      ...initialState,
      transactions: state.transactions
    }
  }
}, initialState)
