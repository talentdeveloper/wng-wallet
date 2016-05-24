import React from 'react'
import { shallowWithIntl } from '../helpers/intl'

import { RegisterForm } from 'components/RegisterForm'

describe('(Component) RegisterForm', () => {
  let _component
  beforeEach(() => {
    _component = shallowWithIntl(<RegisterForm />)
  })
})
