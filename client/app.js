import React from 'react'
import {withRouter} from 'react-router-dom'

import {Navbar, Footer} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-container">
        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(App)
