import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import IndexView from 'views/IndexView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={IndexView} />
  </Route>
)
