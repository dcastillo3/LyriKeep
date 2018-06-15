import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSong} from '../../store'

/**
 * COMPONENT
 */
class SingleSong extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const userId = this.props.id
    const songId = this.props.songId
    this.props.fetchSong(userId, songId)
  }

  render() {
  const email = this.props.email
  const song = this.props.song

  let songImage = {
    backgroundImage: `url('/images/${song.image}')`
  }

  return (
    <div className="main single-song">
      <h3>Welcome, {email}</h3>
            <div className="user-song-container" key={song.id}>
              <div className="user-song-image" style={songImage} />
              <div className="user-song-title">{song.title}</div>
              <div className="user-song-description">{song.description}</div>
              <div className="user-song-tags">{song.tags}</div>
            </div>
            <div className="editor-container">
                <div className="editor" contentEditable="true">
                    <div className="bar">
                        <div className="beat">Beat Text 1</div>
                        <div className="beat">Beat Text 2</div>
                        <div className="beat">Beat Text 3</div>
                        <div className="beat">Beat Text 4</div>
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
const mapState = (state, ownProps) => {
  return {
    email: state.user.email,
    id: state.user.id,
    songId: ownProps.match.params.songId,
    song: state.song
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSong (userId, songId) {
      dispatch(fetchSong(userId, songId))
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleSong)
)
