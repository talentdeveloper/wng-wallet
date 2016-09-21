import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { responsiveStateReducer as browser } from 'redux-responsive'

import intl from 'redux/modules/intl'
import site from 'redux/modules/site'
import transaction from 'redux/modules/transaction'

import auth from 'routes/Auth/modules/Auth'
import forging from 'routes/Forging/modules/Forging'
import accounts from 'routes/Accounts/modules/Accounts'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    auth,
    accounts,
    browser,
    form,
    intl,
    router,
    site,
    transaction,
    forging,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
