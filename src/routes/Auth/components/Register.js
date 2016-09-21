import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui'

import PageTitle from 'components/PageTitle'
import RegisterFormContainer from '../containers/RegisterFormContainer'

export class Register extends React.Component {
  render () {
    const {
      intl: {
        formatMessage
      },
      registerError
    } = this.props

    return (
      <PageTitle pageName='register'>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'register' })}
                subtitle={formatMessage({ id: 'register_subtitle' })} />
              <CardText>
                <strong><FormattedMessage id='registration_help' /></strong>
                <p dangerouslySetInnerHTML={{ __html: formatMessage({ id: 'screenshot_help' }) }} />
                {registerError && <div style={{ color: 'red' }}>
                  <FormattedMessage id={registerError} />
                </div>}
                <RegisterFormContainer />
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

Register.propTypes = {
  intl: PropTypes.object.isRequired,
  registerError: PropTypes.string.isRequired
}

export default Register
