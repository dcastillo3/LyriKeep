import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
  }

  render() {
    const {isLoggedIn} = this.props

  return (
    <div className="home">
      <div className="home-landing-container">
        <div className="home-bg-image">
            <div className="home-image-overlay">
                <div className="home-text-container">
                    <div className="home-title">Write Your Own Story</div>
                    <div className="home-description">Join our community of musicians, poets, rappers and various lyrical artists.<br />Organize your content and speak your creativity into existence.</div>
                    {isLoggedIn ? 
                      <Link className="home-signup-button" to="/user">View My Songs</Link> :
                      <Link className="home-signup-button" to="/login">Sign Up For Free</Link> 
                      }
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Home)
)
