import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-flexgrid'

import PageTitle from 'components/PageTitle'
import RegisterForm from 'components/RegisterForm'

export class RegisterView extends React.Component {
  render () {
    return (
      <PageTitle pageName='register'>
        <Row>
          Login
        </Row>
        <Row>
          <RegisterForm />
        </Row>
      </PageTitle>
    )
  }
}

export default connect()(RegisterView)
