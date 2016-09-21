import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Card,
  CardTitle,
  CardText,
  RaisedButton
} from 'material-ui'
import { saveAs } from 'file-saver'

import PageTitle from 'components/PageTitle'

export class Settings extends React.Component {
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
      </PageTitle>
    )
  }
}

Settings.propTypes = {
  intl: PropTypes.object.isRequired,
  encryptedSecretPhrase: PropTypes.object.isRequired
}

export default Settings
