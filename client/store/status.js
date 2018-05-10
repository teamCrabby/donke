/**
 * ACTION TYPES
 */
const SET_STATUS = 'SET_STATUS'

/**
 * INITIAL STATE
 */

const defaultStatus = 'working'


/**
 * ACTION CREATORS
 */
const setStatus = (status) => ({ type: SET_STATUS, status })

/**
 * THUNK CREATORS
 */
export const fetchStatus = (status) =>
    dispatch =>
        dispatch(setStatus(status))

/**
 * REDUCER
 */
export default function (state = defaultStatus, action) {
    switch (action.type) {
        case SET_STATUS:
            return action.status;
        default:
            return state;
    }
}
