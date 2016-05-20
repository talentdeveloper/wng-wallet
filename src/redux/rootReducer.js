import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import locale from './modules/locale'
import site from './modules/site'

export default combineReducers({
  counter,
  locale,
  router,
  site
})
