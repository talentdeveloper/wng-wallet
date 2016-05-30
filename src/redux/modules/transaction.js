import { createAction, handleActions } from 'redux-actions'
import { sendRequest } from 'redux/utils/apiOld'

const SEND_MONEY = 'SEND_MONEY'
export const sendMoney = (data) => {
  return (dispatch, getState) => {
    dispatch(createAction(SEND_MONEY)())
    const { secretPhrase } = getState().auth
    return sendRequest('sendMoney', {
      recipient: data.recipientRS,
      amount: 1e8,
      secretPhrase
    }).then(function (result) {
      console.log(result)
    })
  }
}

const initialState = {
  sendingTransaction: false,
  transactions: []
}

export default handleActions({
  [SEND_MONEY]: state => {
    return {
      ...state,
      sendingTransaction: true
    }
  }
}, initialState)
