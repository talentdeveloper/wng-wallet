import { createAction, handleActions } from 'redux-actions'
import { addLocaleData } from 'react-intl'
import zhLocaleData from 'react-intl/locale-data/zh'
import myLocaleData from 'react-intl/locale-data/my'
import taLocaleData from 'react-intl/locale-data/ta'
import en from '../../locale/en'
import my from '../../locale/ms-my'
import zh from '../../locale/zh-cn'
import ta from '../../locale/ta-in'

addLocaleData([
  ...zhLocaleData,
  ...myLocaleData,
  ...taLocaleData
])

let locale = 'en'
let messages = {
  en,
  my,
  zh,
  ta
}

const language = localStorage.getItem('wallet_locale') ||
  window.navigator.userLanguage || window.navigator.language

if (language.indexOf('zh') !== -1) {
  locale = 'zh'
}
if (language.indexOf('my') !== -1) {
  locale = 'my'
}
if (language.indexOf('ta') !== -1) {
  locale = 'ta'
}

export const CHANGE_LOCALE = 'CHANGE_LOCALE'
export const changeLocale = (locale) => {
  return dispatch => {
    localStorage.setItem('wallet_locale', locale)
    dispatch(createAction(CHANGE_LOCALE)(locale))
  }
}

const initialState = {
  defaultLocale: 'en',
  locale,
  messages: messages[locale]
}

export default handleActions({
  [CHANGE_LOCALE]: (state, { payload }) => {
    return {
      ...state,
      locale: payload,
      messages: messages[payload]
    }
  }
}, initialState)
