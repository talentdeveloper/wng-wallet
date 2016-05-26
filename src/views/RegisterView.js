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
import RegisterForm from 'components/RegisterForm'

export class RegisterView extends React.Component {
  render () {
    const {
      intl: {
        formatMessage
      }
    } = this.props

    return (
      <PageTitle pageName='register'>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'register' })}
                subtitle={formatMessage({ id: 'register_subtitle' })} />
              <CardText>
                <RegisterForm />
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

RegisterView.propTypes = {
  intl: PropTypes.object.isRequired
}

export default injectIntl(
  connect()(RegisterView)
)
