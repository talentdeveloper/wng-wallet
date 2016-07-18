import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { AppBar, RaisedButton } from 'material-ui'

import { openSidebar } from 'redux/modules/site'
import { convertToNXT } from 'redux/utils/nrs'

class Header extends React.Component {
  _onLeftIconButtonTouchTap = () => {
    const { closeSidebar } = this.props
    closeSidebar()
  }

  render () {
    const {
      intl: { formatMessage, formatNumber },
      isLoggedIn,
      balance,
      isBigScreen
    } = this.props

    let balanceDiv = <div>
      {isLoggedIn && <RaisedButton
        label={`
          ${formatMessage({ id: 'balance' })}: ${formatNumber(balance)} ${formatMessage({ id: 'currency_name' })}
        `}
        style={{ margin: 8 }}
        />}
    </div>

    return (
      <AppBar
        title={formatMessage({ id: 'website_name' })}
        iconElementRight={balanceDiv}
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
        showMenuIconButton={!isBigScreen}
        style={{ flex: 'none' }} />
    )
  }
}

Header.propTypes = {
  intl: PropTypes.object.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  balance: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const isLoggedIn = !!state.auth.account.secretPhrase
  const balance = convertToNXT(state.auth.account.unconfirmedBalanceNQT)
  const { locale } = state.intl
  const isBigScreen = state.browser.greaterThan.medium

  return {
    isLoggedIn,
    balance,
    locale,
    isBigScreen
  }
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(openSidebar())
    }
  }
})(Header))
