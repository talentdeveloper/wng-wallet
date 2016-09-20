import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { responsiveStateReducer as browser } from 'redux-responsive'

import intl from 'redux/modules/intl'
import account from 'redux/modules/account'
import auth from 'routes/Auth/modules/Auth'
import site from 'redux/modules/site'
import transaction from 'redux/modules/transaction'
import forging from 'redux/modules/forging'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    auth,
    account,
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
