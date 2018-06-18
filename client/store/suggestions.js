import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SUGGESTIONS = 'GET_SUGGESTIONS'

/**
 * INITIAL STATE
 */
const defaultSuggestions = []

/**
 * ACTION CREATORS
 */
export const getSuggestions = suggestionsObj => {
  let suggestions = suggestionsObj ? suggestionsObj : []
  return ({
  type: GET_SUGGESTIONS,
  suggestions
})
}

/**
 * THUNK CREATORS
 */
export const fetchSuggestions = (lyric) =>
  dispatch =>
  axios.get(`https://api.datamuse.com/words?rel_rhy=${lyric}`)
  .then(res => {
    let suggestions = res.data.length ? res.data : [{word: 'No suggestions found for that word.', score: 0}]
    return dispatch(getSuggestions(suggestions))})
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultSuggestions, action) {
  switch (action.type) {
    case GET_SUGGESTIONS:
      return action.suggestions
    default:
      return state
  }
}
