import { createAction, handleActions } from 'redux-actions'
import { get } from 'redux/utils/api'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const getAccounts = () => {
  return (dispatch, getState) => {
    const { secretPhrase } = getState().auth.account
    const { limit, offset } = getState().account
    const token = generateToken('admin', secretPhrase)

    dispatch(createAction(GET_ACCOUNTS)())
    get('accounts', {
      token,
      limit,
      offset
    }).then((result) => {
      console.log(result)
      dispatch(getAccountsSuccess(result))
    })
  }
}

export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
export const getAccountsSuccess = createAction(GET_ACCOUNTS_SUCCESS)

export const NEXT_PAGE = 'NEXT_PAGE'
export const nextPage = () => {
  return dispatch => {
    dispatch(createAction(NEXT_PAGE)())
    dispatch(getAccounts())
  }
}

export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'
export const previousPage = () => {
  return dispatch => {
    dispatch(createAction(PREVIOUS_PAGE)())
    dispatch(getAccounts())
  }
}

const initialState = {
  accounts: [],
  isRetrievingAccounts: false,
  limit: 10,
  offset: 0
}

export default handleActions({
  [GET_ACCOUNTS]: state => {
    return {
      ...state,
      isRetrievingAccounts: true
    }
  },

  [GET_ACCOUNTS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      accounts: payload.accounts,
      isRetrievingAccounts: false
    }
  },

  [NEXT_PAGE]: state => {
    return {
      ...state,
      offset: state.offset + 10
    }
  },

  [PREVIOUS_PAGE]: state => {
    return {
      ...state,
      offset: state.offset - 10
    }
  }
}, initialState)
