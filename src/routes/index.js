import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import AuthRoute from './Auth'
import HomeRoute from './Home'
import AccountsRoute from './Accounts'
import ForgingRoute from './Forging'
import SettingsRoute from './Settings'

export const requireAuth = (store) => (nextState, replace) => {
  const loggedIn = store.getState().auth.account.secretPhrase !== ''

  if (!loggedIn) {
    replace('/login')
  }
}

export const requireAdmin = (store) => (nextState, replace) => {
  const { isAdmin } = store.getState().auth

  if (!isAdmin) {
    replace('/admin')
  }
}

export const createRoutes = (store) => ({
  component: CoreLayout,
  childRoutes: [
    AuthRoute(store),
    HomeRoute(store),
    AccountsRoute(store),
    ForgingRoute(store),
    SettingsRoute(store)
  ]
})

export default createRoutes
