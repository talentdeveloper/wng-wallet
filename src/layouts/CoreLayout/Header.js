import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import AppBar from 'material-ui/AppBar'

import {
  openSidebar
} from 'redux/modules/site'

class Header extends React.Component {
  _onLeftIconButtonTouchTap = () => {
    const { closeSidebar } = this.props
    closeSidebar()
  }

  render () {
    const { intl: { formatMessage } } = this.props

    return (
      <AppBar
        title={formatMessage({ id: 'website_name' })}
        iconClassNameRight='muidocs-icon-navigation-expand-more'
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
    )
  }
}

Header.propTypes = {
  intl: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired
}

export default injectIntl(connect((state) => {
  return state
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(openSidebar())
    }
  }
})(Header))
