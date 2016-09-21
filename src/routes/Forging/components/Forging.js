import React, { PropTypes } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui'

import ForgingFormContainer from '../containers/ForgingFormContainer'
import ForgingStatus from './ForgingStatus'

export class Forging extends React.Component {
  render () {
    const {
      intl: { formatMessage },
      status,
      getForging,
      node,
      forgedBalance
    } = this.props

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'forging' })} />
        <CardText>
          <Row>
            <Col xs={12} md={12}>
              <p>
                <strong><FormattedMessage id='total_earned_forging' />&nbsp;</strong>
                <FormattedNumber value={forgedBalance} />&nbsp;<FormattedMessage id='currency_name' />
              </p>
              <ForgingStatus status={status} node={node} getForging={getForging} />
              <div style={{ marginTop: 10 }}>
                <FormattedMessage id='forging_explanation' />
                <p style={{ color: 'red' }}>
                  <FormattedMessage id='warning' />&nbsp;
                  <FormattedMessage id='forging_help' />
                </p>
              </div>
              <ForgingFormContainer />
            </Col>
          </Row>
        </CardText>
      </Card>
    )
  }
}

Forging.propTypes = {
  intl: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  node: PropTypes.string.isRequired,
  getForging: PropTypes.func.isRequired,
  forgedBalance: PropTypes.string.isRequired
}

export default Forging
