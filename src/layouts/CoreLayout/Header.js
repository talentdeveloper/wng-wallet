import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { AppBar, RaisedButton } from 'material-ui'

import ChangeLocaleMenu from 'components/ChangeLocaleMenu'

import { changeLocale } from 'redux/modules/intl'
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
      locale,
      changeLocale
    } = this.props

    let balanceDiv = <div>
      <ChangeLocaleMenu locale={locale} onChange={changeLocale} />
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
        showMenuIconButton={isLoggedIn} />
    )
  }
}

Header.propTypes = {
  intl: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  balance: PropTypes.string.isRequired
}

export default injectIntl(connect((state) => {
  const isLoggedIn = !!state.auth.account.secretPhrase
  const balance = convertToNXT(state.auth.account.unconfirmedBalanceNQT)
  const { locale } = state.intl

  return {
    isLoggedIn,
    balance,
    locale
  }
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(openSidebar())
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale))
    }
  }
})(Header))
