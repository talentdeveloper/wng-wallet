import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import locale from './modules/locale'
import account from './modules/account'
import auth from './modules/auth'
import site from './modules/site'
import transaction from './modules/transaction'

export default combineReducers({
  form: formReducer,
  locale,
  router,
  site,
  account,
  auth,
  transaction
})
