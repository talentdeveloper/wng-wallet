import React from 'react'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider } from 'react-intl'
import { mount, shallow } from 'enzyme'

import configureStore from 'redux/configureStore'

const messages = require('../../src/locale/en')

export function shallowWithIntl (node, store = configureStore()) {
  return shallow(<IntlProvider locale='en' messages={messages}><Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {node}
    </MuiThemeProvider>
  </Provider></IntlProvider>)
}

export function mountWithIntl (node, store = configureStore()) {
  return mount(<IntlProvider locale='en' messages={messages}><Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {node}
    </MuiThemeProvider>
  </Provider></IntlProvider>)
}
