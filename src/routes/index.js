import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import AuthRoute from './Auth'
import AccountsRoute from './Accounts'
import ForgingRoute from './Forging'

import IndexView from 'views/IndexView'
import SettingsView from 'views/SettingsView'

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
  childRoutes: [{
    onEnter: requireAuth(store),
    childRoutes: [{
      onEnter: requireAuth(store),
      component: IndexView,
      path: '/'
    }, {
      onEnter: requireAuth(store),
      component: SettingsView,
      path: '/settings'
    }]
  },
    AuthRoute(store),
    AccountsRoute(store),
    ForgingRoute(store)
  ]
})

export default createRoutes
