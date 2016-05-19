import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-flexbox-grid'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../styles/core.scss'

import Header from './Header'
import SideBar from './SideBar'

function CoreLayout ({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Grid>
        <Row>
          <Header />
        </Row>
        <Row>
          <SideBar />
          {children}
        </Row>
      </Grid>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
