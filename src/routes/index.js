import React from 'react'
import { Route } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import IndexView from 'views/IndexView'
import LoginView from 'views/LoginView'
import RegisterView from 'views/RegisterView'
import AccountsView from 'views/AccountsView'
import SettingsView from 'views/SettingsView'

export default (store) => {
  const isLoggedIn = (nextState, replace) => {
    const loggedIn = store.getState().auth.account.secretPhrase !== ''

    if (!loggedIn) {
      replace('/login')
    }
  }

  const isAdmin = (nextState, replace) => {
    const { isAdmin } = store.getState().auth

    if (!isAdmin) {
      replace('/admin')
    }
  }

  return (
    <Route component={CoreLayout}>
      <Route path='/' component={IndexView} onEnter={isLoggedIn} />
      <Route path='/settings' component={SettingsView} onEnter={isLoggedIn} />
      <Route path='/admin' component={LoginView} />
      <Route path='/login' component={LoginView} />
      <Route path='/register' component={RegisterView} />
      <Route path='/accounts' component={AccountsView} onEnter={isAdmin} />
    </Route>
  )
}
