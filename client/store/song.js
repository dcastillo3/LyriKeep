import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SONG = 'GET_SONG'

/**
 * INITIAL STATE
 */
const defaultSong = {}

/**
 * ACTION CREATORS
 */
const getSong = song => ({
  type: GET_SONG,
  song
})

/**
 * THUNK CREATORS
 */
  export const fetchSong = (userId, songId) =>
  dispatch =>
  axios.get(`/api/users/${userId}/songs/${songId}`)
  .then(res =>
    dispatch(getSong(res.data)))
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultSong, action) {
  switch (action.type) {
      case GET_SONG:
      return action.song
    default:
      return state
  }
}
