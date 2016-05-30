import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'
import {
  Card,
  CardTitle,
  CardText,
  RaisedButton
} from 'material-ui'
import CopyToClipboard from 'react-copy-to-clipboard'

import PageTitle from 'components/PageTitle'

export class IndexView extends React.Component {
  constructor () {
    super()
    this.state = {
      showCopiedToolTip: false
    }
  }

  _onCopy = () => {
    this.setState({
      showCopiedToolTip: true
    })
  }

  render () {
    const {
      intl: {
        formatMessage
      },
      accountRS
    } = this.props

    const { showCopiedToolTip } = this.state

    return (
      <PageTitle pageName='home'>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'website_name' })}
                subtitle={formatMessage({ id: 'website_subtitle' })} />
              <CardText>
                <CopyToClipboard text={accountRS} onCopy={this._onCopy}>
                  <RaisedButton
                    ref='accountRS'
                    label={accountRS}
                    secondary />
                </CopyToClipboard>
                {showCopiedToolTip && <FormattedMessage id='copied_succes' />}
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

IndexView.propTypes = {
  intl: PropTypes.object.isRequired,
  accountRS: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const { accountRS } = state.auth.account

  return {
    accountRS
  }
})(IndexView))
