import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Dialog, FlatButton } from 'material-ui'
import { Row, Col } from 'react-flexgrid'
import CopyToClipboard from 'react-copy-to-clipboard'
import QRCode from 'qrcode.react'

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
        <Row>
          <Col xs={12} md={8}>
            <h3><FormattedMessage id='account_number' /></h3>
            <FormattedMessage id='account_help_message' /><br />
            <FormattedMessage id='your_account_number_is' /> <CopyToClipboard text={accountRS} onCopy={this._onCopy}>
              <FlatButton label={accountRS} />
            </CopyToClipboard> <br />(<FormattedMessage id='click_to_copy_account' />)
            {copySuccess
              ? <div style={{ color: 'green' }}>
                <FormattedMessage id='copied_account' />
              </div>
              : null}
          </Col>
          <Col xs={12} md={4}>
            <h3><FormattedMessage id='scan_qr_code' /></h3>
            <QRCode value={accountRS} />
            <p><FormattedMessage id='qr_help_message' /></p>
          </Col>
        </Row>
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
