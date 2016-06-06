import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import {
  closeSidebar
} from 'redux/modules/site'

class Sidebar extends React.Component {
  _onRequestChange = () => {
    const { closeSidebar } = this.props
    closeSidebar()
  }

  _onLogoutClick = () => {
    const { intl: { formatMessage } } = this.props
    const logout = confirm(formatMessage({ id: 'logout_confirmation' }))

    if (logout) {
      window.location.href = '/'
    }
  }

  render () {
    const { open } = this.props

    return (
      <Drawer
        docked={false}
        open={open}
        onRequestChange={this._onRequestChange}>
        <MenuItem onTouchTap={this._onLogoutClick}><FormattedMessage id='logout' /></MenuItem>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
  const open = state.site.sidebarOpen
  return {
    open
  }
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(closeSidebar())
    }
  }
})(Sidebar))
