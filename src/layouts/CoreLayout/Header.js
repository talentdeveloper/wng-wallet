import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { AppBar } from 'material-ui'

import { openSidebar } from 'redux/modules/site'

class Header extends React.Component {
  _onLeftIconButtonTouchTap = () => {
    const { closeSidebar } = this.props
    closeSidebar()
  }

  render () {
    const {
      intl: { formatMessage },
      isBigScreen
    } = this.props

    return (
      <AppBar
        title={formatMessage({ id: 'website_name' })}
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
  isLoggedIn: PropTypes.bool.isRequired
}

export default injectIntl(connect((state) => {
  const isLoggedIn = !!state.auth.account.secretPhrase
  const { locale } = state.intl
  const isBigScreen = state.browser.greaterThan.medium

  return {
    isLoggedIn,
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
