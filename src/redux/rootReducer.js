import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { responsiveStateReducer as browser } from 'redux-responsive'

import intl from './modules/intl'
import account from './modules/account'
import auth from './modules/auth'
import site from './modules/site'
import transaction from './modules/transaction'
import forging from './modules/forging'

export default combineReducers({
  form: formReducer,
  intl,
  router,
  site,
  browser,
  account,
  auth,
  transaction,
  forging
})
