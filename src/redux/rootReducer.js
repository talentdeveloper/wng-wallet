import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import locale from './modules/locale'
import auth from './modules/auth'
import site from './modules/site'

export default combineReducers({
  form: formReducer,
  locale,
  router,
  site,
  auth
})
