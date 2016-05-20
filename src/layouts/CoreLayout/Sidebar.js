import React, { PropTypes } from 'react'
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

  render () {
    const { open } = this.props

    return (
      <Drawer
        docked={false}
        open={open}
        onRequestChange={this._onRequestChange}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired
}

export default connect((state) => {
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
})(Sidebar)
