import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import {
  Card,
  CardTitle,
  CardText,
  RaisedButton
} from 'material-ui'
import { saveAs } from 'file-saver'

import PageTitle from 'components/PageTitle'

export class SettingsView extends React.Component {
  _onDownloadBackupClick = () => {
    const { encryptedSecretPhrase } = this.props
    const blob = new Blob([JSON.stringify(encryptedSecretPhrase)], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'wallet.json')
  }

  render () {
    const {
      intl: { formatMessage }
    } = this.props

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    return (
      <PageTitle pageName='settings'>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardTitle
                title={formatMessage({ id: 'settings' })}
                subtitle={formatMessage({ id: 'settings_subtitle' })} />
              <CardText>
                <RaisedButton
                  label={formatMessage({ id: 'download_backup' })}
                  onTouchTap={this._onDownloadBackupClick} />
                <p><FormattedMessage id='download_backup_help' /></p>
                {isSafari && <p>
                  <FormattedMessage id='download_backup_safari_help' />
                </p>}
              </CardText>
            </Card>
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

SettingsView.propTypes = {
  intl: PropTypes.object.isRequired,
  encryptedSecretPhrase: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const { encryptedSecretPhrase } = state.auth.account

  return {
    encryptedSecretPhrase
  }
})(SettingsView))
