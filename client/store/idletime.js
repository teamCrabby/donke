
/**
 * ACTION TYPES
 */
const UPDATE_IDLE_TIME = 'UPDATE_IDLE_TIME';


/**
 * INITIAL STATE
 */

 const initialIdleTime = 0;


/**
 * ACTION CREATORS
 */
const setIdleTime = (idleTime) => ({type: UPDATE_IDLE_TIME, idleTime})

/**
 * THUNK CREATORS
 */
// export const fetchBreakInterval = (time) =>
//   dispatch =>
//     dispatch(setBreakInterval(time))

/**
 * REDUCER
 */
export default function (state = initialIdleTime, action) {
  switch (action.type) {
    case UPDATE_IDLE_TIME:
      return action.idleTime; 
    default:
      return state;
  }
}