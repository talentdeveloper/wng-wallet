import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-flexgrid'

class LoginView extends React.Component {
  render () {
    console.log(this.props)
    return (
      <Row>
        Login
      </Row>
    )
  }
}

export default connect()(LoginView)
