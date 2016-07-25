import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Dialog, FlatButton } from 'material-ui'

import { hideNewVersionModal } from 'redux/modules/site'

export class GetNewVersionModal extends React.Component {
  _handleClose = () => {
    const { hideNewVersionModal } = this.props
    hideNewVersionModal()
  }

  _refreshPage = () => {
    window.location.reload(true)
  }

  render () {
    const {
      intl: { formatMessage },
      show
    } = this.props

    const actions = [
      <FlatButton
        label={formatMessage({ id: 'cancel' })}
        primary
        onTouchTap={this._handleClose}
      />,
      <FlatButton
        label={formatMessage({ id: 'update_now' })}
        primary
        onTouchTap={this._refreshPage}
      />
    ]

    return (
      <Dialog
        open={show}
        title={formatMessage({ id: 'new_version_available' })}
        modal
        actions={actions}>
        <FormattedMessage id='update_wallet_help' />
      </Dialog>
    )
  }
}

GetNewVersionModal.propTypes = {
  intl: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  hideNewVersionModal: PropTypes.func.isRequired
}

export default injectIntl(connect(state => {
  const { version, newVersion, hideNewVersionModal } = state.site

  return {
    show: version < newVersion && !hideNewVersionModal
  }
}, {
  hideNewVersionModal
})(GetNewVersionModal))
