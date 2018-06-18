import React from 'react'
import {withRouter} from 'react-router-dom'

import {Navbar} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-container">
        <Routes />
      </div>
    </div>
  )
}

export default withRouter(App)
