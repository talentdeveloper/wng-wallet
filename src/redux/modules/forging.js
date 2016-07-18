import { createAction, handleActions } from 'redux-actions'
import { nrsUrl, forgingNodes, insecureSendRequest } from 'redux/utils/api'

export const GET_FORGING = 'GET_FORGING'
export const getForging = (data) => {
  return (dispatch, getState) => {
    const { secretPhrase } = getState().auth.account
    dispatch(createAction(GET_FORGING)())
    const node = data || nrsUrl

    insecureSendRequest(node, 'getForging', { secretPhrase })
      .then((result) => {
        if (result && result.accountRS &&
          result.hitTime !== 0 && result.deadline !== 0) {
          return dispatch(getForgingSuccess('is_forging'))
        }
        return dispatch(getForgingSuccess('not_forging'))
      })
  }
}

export const GET_FORGING_SUCCESS = 'GET_FORGING_SUCCESS'
export const getForgingSuccess = createAction(GET_FORGING_SUCCESS)

export const START_FORGING = 'START_FORGING'
export const startForging = (data) => {
  return (dispatch, getState) => {
    const { secretPhrase } = getState().auth.account
    const node = data.node || nrsUrl

    dispatch(createAction(START_FORGING)())
    insecureSendRequest(node, 'startForging', { secretPhrase })
      .then((result) => {
        if (result && !result.errorDescription &&
          result.hitTime !== 0 && result.deadline !== 0) {
          return dispatch(getForgingSuccess('is_forging'))
        }
        return dispatch(getForgingSuccess('not_forging'))
      })
  }
}

export const STOP_FORGING = 'STOP_FORGING'
export const stopForging = (data) => {
  return (dispatch, getState) => {
    const { secretPhrase } = getState().auth.account
    const node = data.node || nrsUrl

    dispatch(createAction(STOP_FORGING)())
    insecureSendRequest(node, 'stopForging', { secretPhrase })
      .then((result) => {
        if (result && result.foundAndStopped) {
          return dispatch(getForgingSuccess('not_forging'))
        }
        return dispatch(getForgingSuccess('unknown'))
      })
  }
}

export const SET_FORGER_NODE = 'SET_FORGER_NODE'
export const setForgerNode = createAction(SET_FORGER_NODE)

const initialState = {
  defaultNode: nrsUrl,
  nodes: forgingNodes,
  status: 'unknown'
}

export default handleActions({
  [GET_FORGING_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      status: payload
    }
  },

  [SET_FORGER_NODE]: (state, { payload }) => {
    return {
      ...state,
      defaultNode: payload
    }
  }
}, initialState)
