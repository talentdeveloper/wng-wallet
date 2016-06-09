import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import intl from './modules/intl'
import account from './modules/account'
import auth from './modules/auth'
import site from './modules/site'
import transaction from './modules/transaction'

export default combineReducers({
  form: formReducer,
  intl,
  router,
  site,
  account,
  auth,
  transaction
})
