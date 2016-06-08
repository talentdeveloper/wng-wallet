import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText,
  Snackbar
} from 'material-ui'

import PageTitle from 'components/PageTitle'
import LoginForm from 'components/LoginForm'

export class LoginView extends React.Component {
  render () {
    const {
      intl: {
        formatMessage
      },
      loginError,
      registerSuccess
    } = this.props

    const isAdmin = window.location.pathname.includes('/admin')

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
                {registerSuccess && <div>
                  <FormattedMessage id='successfully_registered' />
                </div>}
                <LoginForm isAdmin={isAdmin} />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Snackbar
          open={registerSuccess}
          message={formatMessage({ id: 'successfully_registered' })}
        />
      </PageTitle>
    )
  }
}

LoginView.propTypes = {
  intl: PropTypes.object.isRequired,
  loginError: PropTypes.string.isRequired,
  registerSuccess: PropTypes.bool.isRequired
}

export default injectIntl(connect((state) => {
  const { loginError, registerSuccess } = state.auth

  return {
    loginError,
    registerSuccess
  }
})(LoginView))
