import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-flexbox-grid'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import '../../styles/core.scss'

import Header from './Header'
import Sidebar from './Sidebar'
import PageTitle from 'components/PageTitle'

function CoreLayout ({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <PageTitle pageName='home'>
        <Grid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Sidebar />
            {children}
          </Row>
        </Grid>
      </PageTitle>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
