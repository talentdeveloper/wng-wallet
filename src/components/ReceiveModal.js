import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Dialog, FlatButton } from 'material-ui'
import CopyToClipboard from 'react-copy-to-clipboard'

export class ReceiveModal extends React.Component {
  constructor () {
    super()
    this.state = {
      copySuccess: false
    }
  }

  _onCopy = () => {
    this.setState({
      copySuccess: true
    })
  }

  _handleClose = () => {
    const { handleClose } = this.props
    handleClose()
    this.state = {
      copySuccess: false
    }
  }

  render () {
    const {
      intl: { formatMessage },
      show,
      accountRS
    } = this.props

    const { copySuccess } = this.state

    const actions = [<FlatButton
      label={formatMessage({ id: 'cancel' })}
      onTouchTap={this._handleClose}
      />
    ]

    return (
      <Dialog
        open={show}
        actions={actions}
        title={formatMessage({ id: 'receive_currency' })}
        autoScrollBodyContent
        autoDetectWindowHeight={false}
        onRequestClose={this._handleClose}>
        <div>
          Your account number is <CopyToClipboard text={accountRS} onCopy={this._onCopy}>
            <FlatButton label={accountRS} />
          </CopyToClipboard> (<FormattedMessage id='click_to_copy_account' />)
        </div>
        {copySuccess
          ? <div style={{ color: 'green' }}>
            <FormattedMessage id='copied_account' />
          </div>
          : null}

      </Dialog>
    )
  }
}

ReceiveModal.propTypes = {
  intl: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  accountRS: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default injectIntl(ReceiveModal)
