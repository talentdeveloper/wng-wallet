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
      registerSuccess,
      connectionError
    } = this.props

    const isAdmin = window.location.pathname.includes('/admin')
    const pageName = isAdmin ? 'admin_login' : 'login'

    const openSnackbar = registerSuccess || connectionError
    let snackbarMessage
    if (registerSuccess) {
      snackbarMessage = formatMessage({ id: 'successfully_registered' })
    } else {
      snackbarMessage = formatMessage({ id: 'connection_error' })
    }

    return (
      <PageTitle pageName={pageName}>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <Card>
              <CardTitle
                title={formatMessage({ id: pageName })}
                subtitle={formatMessage({ id: 'login_subtitle' })} />
              <CardText>
                {loginError && <div style={{ color: 'red' }}>
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
          open={openSnackbar}
          message={snackbarMessage}
        />
      </PageTitle>
    )
  }
}

LoginView.propTypes = {
  intl: PropTypes.object.isRequired,
  loginError: PropTypes.string.isRequired,
  registerSuccess: PropTypes.bool.isRequired,
  connectionError: PropTypes.bool.isRequired
}

export default injectIntl(connect((state) => {
  const { loginError, registerSuccess } = state.auth
  const { connectionError } = state.site

  return {
    loginError,
    registerSuccess,
    connectionError
  }
})(LoginView))
