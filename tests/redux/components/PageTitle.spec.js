import React from 'react'
import PageTitle from 'components/PageTitle'

import { mountWithIntl } from '../../helpers/intl'

describe('(Component) PageTitle', () => {
  beforeEach(() => {
      mountWithIntl(<PageTitle pageName='test'><h1>Test</h1></PageTitle>)
  })

  it('Should set document title to test', () => {
    expect(global.document.title).to.equal('Test | NXT Web Wallet')
  })

  it('Should set document title to home when no pageName prop is supplied', () => {
    mountWithIntl(<PageTitle><h1>Test</h1></PageTitle>)
    expect(global.document.title).to.equal('Home | NXT Web Wallet')
  })
})
