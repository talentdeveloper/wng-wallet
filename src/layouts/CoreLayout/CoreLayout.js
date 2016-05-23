import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-flexgrid'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import '../../styles/core.scss'
import 'react-flexgrid/lib/flexgrid.css'

import Header from './Header'
import Sidebar from './Sidebar'
import PageTitle from 'components/PageTitle'

function CoreLayout ({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <PageTitle pageName='home'>
        <div>
          <Header />
          <Grid fluid>
            <Row>
              <Sidebar />
              {children}
            </Row>
          </Grid>
        </div>
      </PageTitle>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
