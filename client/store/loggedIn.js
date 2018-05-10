/**
 * ACTION TYPES
 */
const SET_LOGGED_IN = 'SET_LOGGED_IN'

/**
 * INITIAL STATE
 */

const defaultStatus = false;


/**
 * ACTION CREATORS
 */
export const setLoggedIn = (loggedInBool) => ({ type: SET_LOGGED_IN, loggedInBool })

/**
 * THUNK CREATORS
 */
// export const fetchHealth = (health) =>
//   dispatch =>
//     dispatch(setHealth(health))

/**
 * REDUCER
 */
export default function (state = defaultStatus, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return action.loggedInBool;
    default:
      return state;
  }
}
