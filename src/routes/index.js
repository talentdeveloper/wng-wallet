import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import AuthRoute from './Auth'
import ForgingRoute from './Forging'

import IndexView from 'views/IndexView'
import AccountsView from 'views/AccountsView'
import SettingsView from 'views/SettingsView'

const requireAuth = (store) => (nextState, replace) => {
  const loggedIn = store.getState().auth.account.secretPhrase !== ''

  if (!loggedIn) {
    replace('/login')
  }
}

const requireAdmin = (store) => (nextState, replace) => {
  const { isAdmin } = store.getState().auth

  if (!isAdmin) {
    replace('/admin')
  }
}

export const createRoutes = (store) => ({
  component: CoreLayout,
  childRoutes: [{
    onEnter: requireAuth(store),
    childRoutes: [
      ForgingRoute(store), {
        onEnter: requireAuth(store),
        component: IndexView,
        path: '/'
      }, {
        onEnter: requireAdmin(store),
        component: AccountsView,
        path: '/accounts'
      }, {
        onEnter: requireAuth(store),
        component: AccountsView,
        path: '/accounts'
      }, {
        onEnter: requireAuth(store),
        component: SettingsView,
        path: '/settings'
      }
    ]
  },
    AuthRoute(store)
  ]
})

export default createRoutes
