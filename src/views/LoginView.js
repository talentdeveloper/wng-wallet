import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui'

import PageTitle from 'components/PageTitle'
import LoginForm from 'components/LoginForm'

export class LoginView extends React.Component {
  render () {
    const {
      intl: {
        formatMessage
      },
      loginError
    } = this.props

    return (
      <PageTitle pageName='login'>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'login' })}
                subtitle={formatMessage({ id: 'login_subtitle' })} />
              <CardText>
                {loginError && <div>
                  <FormattedMessage id={loginError} />
                </div>}
                <LoginForm />
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

LoginView.propTypes = {
  intl: PropTypes.object.isRequired,
  loginError: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const { loginError } = state.auth

  return {
    loginError
  }
})(LoginView))
