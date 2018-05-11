/**
 * ACTION TYPES
 */
const IN_PLAYPEN = 'IN_PLAYPEN'

/**
 * INITIAL STATE
 */

const defaultPlaypen = false


/**
 * ACTION CREATORS
 */
export const setPlaypenStatus = (bool) => ({ type: IN_PLAYPEN, bool })

/**
 * THUNK CREATORS
 */
// export const fetchHealth = (health) =>
//     dispatch =>
//         dispatch(setHealth(health))

/**
 * REDUCER
 */
export default function (state = defaultPlaypen, action) {
    switch (action.type) {
        case IN_PLAYPEN:
            return action.bool;
        default:
            return state;
    }
}
