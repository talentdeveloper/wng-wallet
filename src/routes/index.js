import React from 'react'
import { Route } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import IndexView from 'views/IndexView'
import LoginView from 'views/LoginView'
import RegisterView from 'views/RegisterView'

export default (store) => {
  const onEnter = (nextState, replace) => {
    const loggedIn = store.getState().auth.secretPhrase !== ''

    if (!loggedIn) {
      replace('/login')
    }
  }

  return (
    <Route component={CoreLayout}>
      <Route path='/' component={IndexView} onEnter={onEnter} />
      <Route path='/login' component={LoginView} />
      <Route path='/register' component={RegisterView} />
    </Route>
  )
}
