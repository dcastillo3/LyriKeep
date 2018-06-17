import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SONGS = 'GET_SONGS'

/**
 * INITIAL STATE
 */
const defaultSongs = []

/**
 * ACTION CREATORS
 */
const getSongs = songs => ({
  type: GET_SONGS,
  songs
})

/**
 * THUNK CREATORS
 */
export const fetchSongs = (userId) =>
  dispatch =>
  axios.get(`/api/users/${userId}/songs/`)
  .then(res =>
    dispatch(getSongs(res.data)))
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultSongs, action) {
  switch (action.type) {
    case GET_SONGS:
      return action.songs
    default:
      return state
  }
}
