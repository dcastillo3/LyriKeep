import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSongs} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const userId = this.props.id
    this.props.fetchSongs(userId)
  }

  render() {
  const email = this.props.email
  const songs = this.props.songs

  return (
    <div className="main user-home">
      <h3 className="user-title">My Songs</h3>
      <div className="user-songs">
        {songs.map(song => {
          let songImage = {
            backgroundImage: `url('/images/${song.image}')`
          }
          return (
            <div className="user-song-container" key={song.id}>
              <Link to={`/user/song/${song.id}`}>
                <div className="user-song-image" style={songImage} />
              </Link>
              <div className="user-meta-container">
                <Link to={`/user/song/${song.id}`}>
                  <div className="user-song-title">{song.title}</div>
                </Link>
                <div className="user-song-description">{song.description}</div>
              </div>
              <div className="user-song-tags"><span className="user-song-tags-title">Tags:</span> {song.tags}</div>
            </div>
          )
        })}
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
    email: state.user.email,
    id: state.user.id,
    songs: state.songs
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSongs (userId) {
      dispatch(fetchSongs(userId))
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(UserHome)
)


/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
