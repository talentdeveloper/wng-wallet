import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText,
  Snackbar
} from 'material-ui'

import PageTitle from 'components/PageTitle'
import LoginFormContainer from '../containers/LoginFormContainer'

export class Login extends React.Component {
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
          <Col xs={12} sm={8} md={6} smOffset={2} mdOffset={3}>
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
                <LoginFormContainer isAdmin={isAdmin} />
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

Login.propTypes = {
  intl: PropTypes.object.isRequired,
  loginError: PropTypes.string.isRequired,
  registerSuccess: PropTypes.bool.isRequired,
  connectionError: PropTypes.bool.isRequired
}

export default Login
