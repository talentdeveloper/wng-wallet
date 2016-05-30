import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { AppBar, FlatButton } from 'material-ui'

import { openSidebar } from 'redux/modules/site'
import { convertToNXT } from 'redux/utils/nrs'

class Header extends React.Component {
  _onLeftIconButtonTouchTap = () => {
    const { closeSidebar } = this.props
    closeSidebar()
  }

  render () {
    const {
      intl: { formatMessage },
      isLoggedIn,
      balance
    } = this.props

    let balanceDiv = null

    if (isLoggedIn) {
      balanceDiv = <FlatButton label={`${balance} ${formatMessage({ id: 'currency_name' })}`} />
    }

    return (
      <AppBar
        title={formatMessage({ id: 'website_name' })}
        iconElementRight={balanceDiv}
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
    )
  }
}

Header.propTypes = {
  intl: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  balance: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const isLoggedIn = !!state.auth.account.secretPhrase
  const balance = convertToNXT(state.auth.account.unconfirmedBalanceNQT)

  return {
    isLoggedIn,
    balance
  }
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(openSidebar())
    }
  }
})(Header))
