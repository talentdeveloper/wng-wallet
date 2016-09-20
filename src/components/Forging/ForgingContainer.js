import React, { PropTypes } from 'react'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui'

import { getForging } from 'redux/modules/forging'
import { convertToNXT } from 'redux/utils/nrs'

import ForgingForm from 'components/Forging/ForgingForm'
import ForgingStatus from 'components/Forging/ForgingStatus'

export class ForgingContainer extends React.Component {
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
              <ForgingForm />
            </Col>
          </Row>
        </CardText>
      </Card>
    )
  }
}

ForgingContainer.propTypes = {
  intl: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  node: PropTypes.string.isRequired,
  getForging: PropTypes.func.isRequired,
  forgedBalance: PropTypes.string.isRequired
}

export default injectIntl(connect(state => {
  const { status } = state.forging
  const node = state.form.forging && state.form.forging.node.value || state.forging.defaultNode
  const forgedBalance = convertToNXT(state.auth.account.forgedBalanceNQT)

  return {
    status,
    node,
    forgedBalance
  }
}, (dispatch) => ({
  getForging: (node) => {
    dispatch(getForging(node))
  }
}))(ForgingContainer))
