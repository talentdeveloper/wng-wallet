import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-flexgrid'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import 'react-flexgrid/lib/flexgrid.css'
import '../../styles/core.scss'

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import PageTitle from 'components/PageTitle'

const theme = getMuiTheme({
  palette: {
    primary1Color: '#2196F3',
    primary2Color: '#1976D2'
  }
})

function CoreLayout ({ children }) {
  return (
    <MuiThemeProvider muiTheme={theme}>
      <PageTitle pageName='home'>
        <Header />
        <Grid fluid style={{ paddingTop: 40, paddingBottom: 20 }}>
          <Row>
            <Sidebar />
            {children}
          </Row>
        </Grid>
        <Footer />
      </PageTitle>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
