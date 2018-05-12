/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'

/**
 * INITIAL STATE
 */

const defaultStatus = ''


/**
 * ACTION CREATORS
 */
const setUser = (user) => ({ type: SET_USER, user })

/**
 * THUNK CREATORS
 */
export const fetchUser = (user) =>
    dispatch =>
        dispatch(setUser(user))

/**
 * REDUCER
 */
export default function (state = defaultStatus, action) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}
