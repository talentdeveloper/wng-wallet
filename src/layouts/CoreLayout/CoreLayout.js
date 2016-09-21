import React, { PropTypes } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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

import style from './CoreLayout.scss'

function CoreLayout ({ children }) {
  return (
    <MuiThemeProvider muiTheme={theme}>
      <PageTitle pageName='home'>
        <Header />
        <div className={style.mainContainer}>
          <Sidebar />
          {children}
        </div>
        <Footer />
      </PageTitle>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
