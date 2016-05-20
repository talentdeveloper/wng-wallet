import { handleActions } from 'redux-actions'

import en from '../../locale/en'

const initialState = {
  lang: 'en',
  messages: en
}

export default handleActions({
}, initialState)
