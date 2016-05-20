import { createAction, handleActions } from 'redux-actions'

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR'
export const openSidebar = createAction(OPEN_SIDEBAR)

export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
export const closeSidebar = createAction(CLOSE_SIDEBAR)

const initialState = {
  sidebarOpen: false
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
  }
}, initialState)
