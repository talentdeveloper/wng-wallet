import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar } from 'material-ui/'

import {
  openSidebar
} from 'redux/modules/site'

class Header extends React.Component {
  _onLeftIconTouchTap = () => {
    const { closeSidebar } = this.props
    closeSidebar()
  }

  render () {
    return (
      <AppBar
        title='Title'
        iconClassNameRight='muidocs-icon-navigation-expand-more'
        onLeftIconButtonTouchTap={this._onLeftIconTouchTap} />
    )
  }
}

Header.propTypes = {
  closeSidebar: PropTypes.func.isRequired
}

export default connect((state) => {
  return state
}, (dispatch) => {
  return {
    closeSidebar: () => {
      dispatch(openSidebar())
    }
  }
})(Header)
