
/**
 * ACTION TYPES
 */
const SET_WORK_INTERVAL = 'SET_WORK_INTERVAL'


/**
 * INITIAL STATE
 */

 const defaultWorkInterval = 0


/**
 * ACTION CREATORS
 */
const setWorkInterval = (time) => ({type: SET_WORK_INTERVAL, time})

/**
 * THUNK CREATORS
 */
export const fetchWorkInterval = (time) =>
  dispatch =>
    dispatch(setWorkInterval(time))

/**
 * REDUCER
 */
export default function (state = defaultWorkInterval, action) {
  switch (action.type) {
    case SET_WORK_INTERVAL:
      return action.time; 
    default:
      return state;
  }
}
