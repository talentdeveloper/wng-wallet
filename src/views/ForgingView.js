import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import PageTitle from 'components/PageTitle'
import ForgingContainer from 'components/Forging/ForgingContainer'

export class ForgingView extends React.Component {

  render () {
    return (
      <PageTitle pageName='forging'>
        <Row>
          <Col xs={12} md={12}>
            <ForgingContainer />
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

ForgingView.propTypes = {
  intl: PropTypes.object.isRequired,
  encryptedSecretPhrase: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const { encryptedSecretPhrase } = state.auth.account

  return {
    encryptedSecretPhrase
  }
})(ForgingView))
