import { createAction, handleActions } from 'redux-actions'
import { get } from 'redux/utils/api'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const getAccounts = () => {
  return (dispatch, getState) => {
    const { secretPhrase } = getState().auth.account
    const { search, limit, offset } = getState().account
    const token = generateToken('admin', secretPhrase)

    const data = {
      token,
      limit,
      offset
    }

    if (search) {
      data.search = search
    }

    dispatch(createAction(GET_ACCOUNTS)())
    get('accounts', data).then((result) => {
      console.log(result)
      dispatch(getAccountsSuccess(result))
    })
  }
}

export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
export const getAccountsSuccess = createAction(GET_ACCOUNTS_SUCCESS)

export const SET_SEARCH = 'SET_SEARCH'
export const setSearch = createAction(SET_SEARCH)

export const NEXT_PAGE = 'ACCOUNTS.NEXT_PAGE'
export const nextPage = () => {
  return dispatch => {
    dispatch(createAction(NEXT_PAGE)())
    dispatch(getAccounts())
  }
}

export const PREVIOUS_PAGE = 'ACCOUNTS.PREVIOUS_PAGE'
export const previousPage = () => {
  return dispatch => {
    dispatch(createAction(PREVIOUS_PAGE)())
    dispatch(getAccounts())
  }
}

export const RESET_PAGINATION = 'ACCOUNTS.RESET_PAGINATION'
export const resetPagination = createAction(RESET_PAGINATION)

const initialState = {
  accounts: [],
  search: '',
  totalAccounts: 0,
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
      totalAccounts: payload.recordsTotal,
      isRetrievingAccounts: false
    }
  },

  [SET_SEARCH]: (state, { payload }) => {
    return {
      ...state,
      search: payload,
      offset: 0,
      limit: 10
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
  },

  [RESET_PAGINATION]: state => {
    return {
      ...state,
      offset: 0
    }
  }
}, initialState)
