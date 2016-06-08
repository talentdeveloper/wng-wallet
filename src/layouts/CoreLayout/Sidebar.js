import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router'
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
    const { open, isAdmin } = this.props

    return (
      <Drawer
        docked={false}
        open={open}
        onRequestChange={this._onRequestChange}>
        <MenuItem>
          <Link to='/'><FormattedMessage id='home' /></Link>
        </MenuItem>
        {isAdmin && <MenuItem>
          <Link to='accounts'><FormattedMessage id='accounts' /></Link>
        </MenuItem>}
        <MenuItem onTouchTap={this._onLogoutClick}><FormattedMessage id='logout' /></MenuItem>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
  const open = state.site.sidebarOpen
  const { isAdmin } = state.auth

  return {
    open,
    isAdmin
  }
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(closeSidebar())
    }
  }
})(Sidebar))
