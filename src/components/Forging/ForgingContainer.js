import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui'

import { getForging } from 'redux/modules/forging'

import ForgingForm from 'components/Forging/ForgingForm'
import ForgingStatus from 'components/Forging/ForgingStatus'

export class ForgingContainer extends React.Component {
  render () {
    const {
      intl: { formatMessage },
      status,
      getForging,
      node
    } = this.props

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'forging' })} />
        <CardText>
          <Row>
            <Col xs={12} md={6}>
              <ForgingStatus status={status} node={node} getForging={getForging} />
              <p style={{ color: 'red' }}>
                <FormattedMessage id='warning' />
                <FormattedMessage id='forging_help' />
              </p>
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
  getForging: PropTypes.func.isRequired
}

export default injectIntl(connect(state => {
  const { status } = state.forging
  const node = state.form.forging && state.form.forging.node.value || state.forging.defaultNode

  return {
    status,
    node
  }
}, (dispatch) => ({
  getForging: () => {
    dispatch(getForging())
  }
}))(ForgingContainer))
