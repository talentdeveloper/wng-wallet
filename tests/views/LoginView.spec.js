import React from 'react'
import { LoginView } from 'views/LoginView'
import { mountWithIntl } from '../helpers/intl'

describe('(View) Login', () => {
  let _component

  beforeEach(() => {
    _component = mountWithIntl(<LoginView />)
  })

  it('Should have document title Login', () => {
    expect(global.document.title).to.equal('Login | NXT Web Wallet')
  })
})
