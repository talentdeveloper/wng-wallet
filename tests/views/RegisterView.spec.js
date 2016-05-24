import React from 'react'
import { mountWithIntl } from '../helpers/intl'

import { RegisterView } from 'views/RegisterView'
import RegisterForm from 'components/RegisterForm'

describe('(View) Register', () => {
  let _component

  beforeEach(() => {
    _component = mountWithIntl(<RegisterView />)
  })

  it('Should have document title Register', () => {
    expect(global.document.title).to.equal('Register | NXT Web Wallet')
  })
})
