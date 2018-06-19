import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSongs, createSong} from '../store'

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
  const userId = this.props.id
  const email = this.props.email
  const songs = this.props.songs
  const addSong = this.props.addSong

  return (
    <div className="main user-home">
      <h3 className="user-title">My Songs</h3>
      <div className="user-songs">
        {songs.sort((song1, song2) => song1.order - song2.order).map(song => {
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
        <div className="user-add-song-form-container">
          <form className="user-add-song-form" onSubmit={(event) => addSong(userId, songs.length + 1, event)}>
            <label>Song Title: </label>
            <input className="user-add-song-input" name="songTitle" />
            <label>Song Description: </label>
            <input className="user-add-song-input" name="songDescription" />
            <label>Song Tags: </label>
            <input className="user-add-song-input" name="songTags" />
            <button type="submit" className="user-add-song">Add Song</button>
          </form>
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
    email: state.user.email,
    id: state.user.id,
    songs: state.songs
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchSongs (userId) {
      dispatch(fetchSongs(userId))
    },
    addSong(userId, lastSongOrder, event) {
      event.preventDefault();
      let title = event.target.songTitle.value
      let description = event.target.songDescription.value
      let tags = event.target.songTags.value.split(' ')
      dispatch(createSong(userId, lastSongOrder, title, description, tags, ownProps.history))
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
