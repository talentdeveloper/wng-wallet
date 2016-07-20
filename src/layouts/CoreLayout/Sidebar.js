import React, { PropTypes } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Drawer, MenuItem, FlatButton } from 'material-ui'

import { closeSidebar } from 'redux/modules/site'

import { convertToNXT } from 'redux/utils/nrs'

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
    const {
      intl: { formatMessage, formatNumber },
      balance,
      open,
      isAdmin,
      isBigScreen,
      isLoggedIn
    } = this.props

    const balanceDiv = <div style={{ margin: 16 }}>
      <strong>{`${formatNumber(balance)} ${formatMessage({ id: 'currency_name' })}`}</strong>
    </div>

    return (
      <Drawer
        width={isBigScreen ? 180 : 250}
        docked={isBigScreen}
        open={open || isBigScreen}
        onRequestChange={this._onRequestChange}>
        {isLoggedIn && balanceDiv}
        <MenuItem onTouchTap={this._onRequestChange} containerElement={<Link to='/' />}>
          <FormattedMessage id='home' />
        </MenuItem>
        {isAdmin && <MenuItem onTouchTap={this._onRequestChange} containerElement={<Link to='accounts' />}>
          <FormattedMessage id='accounts' />
        </MenuItem>}
        {isLoggedIn && <MenuItem onTouchTap={this._onRequestChange} containerElement={<Link to='/forging' />}>
          <FormattedMessage id='forging' />
        </MenuItem>}
        {isLoggedIn && <MenuItem onTouchTap={this._onRequestChange} containerElement={<Link to='/settings' />}>
          <FormattedMessage id='settings' />
        </MenuItem>}
        {isLoggedIn && <MenuItem onTouchTap={this._onLogoutClick}>
          <FormattedMessage id='logout' />
        </MenuItem>}
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  intl: PropTypes.object.isRequired,
  balance: PropTypes.string.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
  const open = state.site.sidebarOpen
  const { isAdmin } = state.auth
  const isLoggedIn = !!state.auth.account.secretPhrase
  const isBigScreen = state.browser.greaterThan.medium
  const balance = convertToNXT(state.auth.account.unconfirmedBalanceNQT)

  return {
    balance,
    open,
    isAdmin,
    isLoggedIn,
    isBigScreen
  }
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(closeSidebar())
    }
  }
})(Sidebar))
