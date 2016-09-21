import { createAction, handleActions } from 'redux-actions'
import { isLocalhost, coin } from 'wallet.config.json'
import { version } from '../../../package.json'

import { get } from 'redux/utils/api'

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR'
export const openSidebar = createAction(OPEN_SIDEBAR)

export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
export const closeSidebar = createAction(CLOSE_SIDEBAR)

export const CONNECTION_ERROR = 'CONNECTION_ERROR'
export const connectionError = createAction(CONNECTION_ERROR)

export const getVersion = () => {
  return dispatch => {
    if (isLocalhost) {
      return
    }

    get('constants')
      .then((result) => {
        if (result && result.walletVersion) {
          dispatch(getVersionSuccess(result.walletVersion))
        }
      })
  }
}

export const GET_VERSION_SUCCESS = 'GET_VERSION_SUCCESS'
export const getVersionSuccess = createAction(GET_VERSION_SUCCESS)

export const HIDE_NEW_VERSION_MODAL = 'HIDE_NEW_VERSION_MODAL'
export const hideNewVersionModal = createAction(HIDE_NEW_VERSION_MODAL)

const initialState = {
  connectionError: false,
  sidebarOpen: false,
  coinName: coin,
  isLocalhost,
  version,
  newVersion: version,
  hideNewVersionModal: false
}

export default handleActions({
  [OPEN_SIDEBAR]: state => {
    return {
      ...state,
      sidebarOpen: true
    }
  },

  [CLOSE_SIDEBAR]: state => {
    return {
      ...state,
      sidebarOpen: false
    }
  },

  [CONNECTION_ERROR]: state => {
    return {
      ...state,
      connectionError: true
    }
  },

  [GET_VERSION_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      newVersion: payload
    }
  },

  [HIDE_NEW_VERSION_MODAL]: state => {
    return {
      ...state,
      hideNewVersionModal: true
    }
  }
}, initialState)
