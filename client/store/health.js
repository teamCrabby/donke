/**
 * ACTION TYPES
 */
const SET_HEALTH = 'SET_HEALTH'

/**
 * INITIAL STATE
 */

const defaultHealth = 10


/**
 * ACTION CREATORS
 */
const setHealth = (health) => ({ type: SET_HEALTH, health })

/**
 * THUNK CREATORS
 */
export const fetchHealth = (health) =>
  dispatch =>
    dispatch(setHealth(health))

/**
 * REDUCER
 */
export default function (state = defaultHealth, action) {
  switch (action.type) {
    case SET_HEALTH:
      return action.health;
    default:
      return state;
  }
}
