import React from 'react'
import { Provider } from 'react-redux'

import { IntlProvider } from 'react-intl'
import { mount, shallow } from 'enzyme'

import configureStore from 'redux/configureStore'

const messages = require('../../src/locale/en')

export function shallowWithIntl (node, store = configureStore()) {
  return shallow(<Provider store={store}>
    <IntlProvider locale='en' messages={messages}>{node}</IntlProvider>
  </Provider>)
}

export function mountWithIntl (node, store = configureStore()) {
  return mount(<Provider store={store}>
    <IntlProvider locale='en' messages={messages}>{node}</IntlProvider>
  </Provider>)
}
