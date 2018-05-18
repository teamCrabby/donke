/**
 * ACTION TYPES
 */
const SET_START = 'SET_START';

/**
 * INITIAL STATE
 */

const defaultStart = true;

/**
 * ACTION CREATORS
 */
export const setStart = bool => ({ type: SET_START, bool });


/**
 * REDUCER
 */
export default function(state = defaultStart, action) {
  switch (action.type) {
    case SET_START:
      return action.bool;
    default:
      return state;
  }
}
