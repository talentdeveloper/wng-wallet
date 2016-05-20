import React from 'react'
import { IntlProvider } from 'react-intl'
import { mount, shallow } from 'enzyme'

const messages = require('../../src/locale/en')

export function shallowWithIntl (node) {
  return shallow(<IntlProvider locale='en' messages={messages}>{node}</IntlProvider>)
}

export function mountWithIntl (node) {
  return mount(<IntlProvider locale='en' messages={messages}>{node}</IntlProvider>)
}
