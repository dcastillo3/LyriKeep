import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSong, beatUpdate, fetchSuggestions, getSuggestions, createBar} from '../../store'

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
    this.props.initialSuggestions()
  }

  render() {
  const email = this.props.email
  const song = this.props.song
  const userId = this.props.id
  const songId = song.id;
  const beatChange = this.props.beatChange
  const suggestions = this.props.suggestions
  const getSuggestions = this.props.getSuggestions
  const addBar = this.props.addBar

  let songImage = {
    backgroundImage: `url('/images/${song.image}')`
  }

  return (
    <div className="main single-song">
            <div className="user-song-info" key={song.id}>
              <div className="user-song-image" style={songImage} />
              <div className="user-meta-container">
                <div className="user-song-title">{song.title}</div>
                <div className="user-song-description">{song.description}</div>
              </div>
              <div className="user-song-tags"><span className="user-song-tags-title">Tags: </span>{song.tags}</div>
            </div>
            <div className="user-song-container">
            <div className="user-song">
                {song.sections && song.sections.sort((section1, section2) => section1.order - section2.order).map(section => {
                    return (
                    <div key={section.id} className="user-section-container">
                      <div className="user-section-name">{section.name}</div>
                        <div order={section.order} className={`user-section section-${section.id}`} key={section.id}>
                            {section.bars.sort((bar1, bar2) => bar1.order - bar2.order).map((bar, index) => {
                                return (
                                  <div key={bar.id} className="user-bar-container">
                                    <div className="user-bar-name">{bar.order}</div>
                                      <div order={bar.order} className={`user-bar bar-${bar.id}`}>
                                        {bar.beats.sort((beat1, beat2) => beat1.order - beat2.order).map(beat => {
                                            let beatId = beat.id;
                                            return (
                                                <div key={beat.id} className="user-beat-container">
                                                  <input onChange={(event) => beatChange(userId, beatId, songId, event)} className={`user-beat beat-${beat.id}`} name="beat" order={beat.order} value={beat.lyric} />
                                                  <button onClick={(event) => getSuggestions(event)} type="submit" className="user-beat-button" name={beat.lyric}>Suggestions</button>
                                                </div>
                                            )
                                        })}
                                      {section.bars[index] === section.bars[section.bars.length - 1] && <button onClick={() => addBar(userId, songId, section.id, section.bars.length + 1)} type="submit" className="user-add-bar">+</button>}
                                    </div>
                                  </div>
                                )
                            })}
                        </div>
                      </div>
                    )
                })}
            </div>
            <div className="lyric-suggestions-container">
              <div className="lyric-suggestions-title">Suggestions</div>
              <div className="lyric-suggestions">
                {suggestions.map(suggestion => (
                  <div key={suggestion.word + suggestion.score} className="lyric-suggestion">{suggestion.word}</div>
                ))}
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
    song: state.song,
    suggestions: state.suggestions
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSong (userId, song) {
      dispatch(fetchSong(userId, song))
    },
    beatChange (userId, beatId, songId, event) {
        let lyrics = event.target.value
        dispatch(beatUpdate(userId, beatId, songId, lyrics))
    },
    getSuggestions (event) {
      let lyrics = event.target.name
      let splitLyrics = lyrics.split(' ')
      let lyric = splitLyrics[splitLyrics.length - 1]
      dispatch(fetchSuggestions(lyric))
    },
    initialSuggestions() {
      dispatch(getSuggestions())
    },
    addBar(userId, songId, sectionId, lastBarOrder) {
      console.log(lastBarOrder)
      dispatch(createBar(userId, songId, sectionId, lastBarOrder))
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleSong)
)
