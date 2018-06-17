import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSong, beatUpdate} from '../../store'

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
  const userId = this.props.id
  const beatChange = this.props.beatChange

  let songImage = {
    backgroundImage: `url('/images/${song.image}')`
  }

  return (
    <div className="main single-song">
      <h3>Welcome, {email}</h3>
            <div className="user-song-info" key={song.id}>
              <div className="user-song-image" style={songImage} />
              <div className="user-song-title">{song.title}</div>
              <div className="user-song-description">{song.description}</div>
              <div className="user-song-tags">{song.tags}</div>
            </div>
            <div className="user-song">
                {song.sections && song.sections.sort((section1, section2) => section1.order - section2.order).map(section => {
                    return (
                        <div order={section.order} className={`user-section section-${section.id}`} key={section.id}>
                            {section.bars.sort((bar1, bar2) => bar1.order - bar2.order).map(bar => {
                                return (
                                    <div order={bar.order} className={`user-bar bar-${bar.id}`} key={bar.id}>
                                        {bar.beats.sort((beat1, beat2) => beat1.order - beat2.order).map(beat => {
                                            let beatId = beat.id;
                                            let songId = song.id;
                                            return (
                                                <input onChange={(event) => beatChange(userId, beatId, songId, event)} className={`user-beat beat-${beat.id}`} name="beat" key={beat.id} order={beat.order} value={beat.lyric} />
                                            )
                                        })}
                                    </div>
                                )
                            })}
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
    fetchSong (userId, song) {
      dispatch(fetchSong(userId, song))
    },
    beatChange (userId, beatId, songId, event) {
        let lyric = event.target.value
        dispatch(beatUpdate(userId, beatId, songId, lyric))
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleSong)
)
