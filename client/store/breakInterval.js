
/**
 * ACTION TYPES
 */
const SET_BREAK_INTERVAL = 'SET_BREAK_INTERVAL'


/**
 * INITIAL STATE
 */

 const defaultBreakInterval = 0


/**
 * ACTION CREATORS
 */
const setBreakInterval = (time) => ({type: SET_BREAK_INTERVAL, time})

/**
 * THUNK CREATORS
 */
export const fetchBreakInterval = (rawTime) =>
  dispatch => {
    let time = rawTime * 60000
    console.log("break time is...", time)
    return dispatch(setBreakInterval(time));
  }
    

/**
 * REDUCER
 */
export default function (state = defaultBreakInterval, action) {
  switch (action.type) {
    case SET_BREAK_INTERVAL:
      return action.time; 
    default:
      return state;
  }
}
