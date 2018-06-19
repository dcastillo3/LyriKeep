import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Footer = ({ handleClick, isLoggedIn }) => (
  <div className="footer">
    <div className="footer-copyright">Copyright 2018 LyriKeep</div>
    <div className="footer-content">LyriKeep and all services offered are copright and content protected. Use our imagination to create content like never before. Organized structure and lyric tools bring you a faster more efficient process. Let your inspiration run wild!</div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/user">My Songs</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Footer)