import React, { PropTypes } from 'react'
import { injectIntl } from 'react-intl'
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
      }
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
  intl: PropTypes.object.isRequired
}

export default injectIntl(
  connect()(LoginView)
)
