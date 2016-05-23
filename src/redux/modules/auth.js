import { createAction, handleActions } from 'redux-actions'

export const LOGIN = 'LOGIN'
export const login = createAction(LOGIN)

export const initialState = {
  secretPhrase: ''
}

export default handleActions({
  [LOGIN]: (state, { payload }) => {
    return {
      ...state,
      secretPhrase: payload
    }
  }
}, initialState)
