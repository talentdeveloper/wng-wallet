import { createAction, handleActions } from 'redux-actions'
import { addLocaleData } from 'react-intl'
import zhLocaleData from 'react-intl/locale-data/zh'
import myLocaleData from 'react-intl/locale-data/my'
import taLocaleData from 'react-intl/locale-data/ta'
import itLocaleData from 'react-intl/locale-data/it'
import en from '../../locale/en'
import my from '../../locale/ms-my'
import zh from '../../locale/zh-cn'
import ta from '../../locale/ta-in'
import it from '../../locale/it'

addLocaleData([
  ...zhLocaleData,
  ...myLocaleData,
  ...taLocaleData,
  ...itLocaleData
])

let locale = 'en'
let messages = {
  en,
  my: { ...en, ...my },
  zh: { ...en, ...zh },
  ta: { ...en, ...ta },
  it: { ...en, ...it }
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
