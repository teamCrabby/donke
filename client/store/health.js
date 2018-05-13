import {db, auth} from '../app'
import store from './index.js'

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



// export const createAvatarFirebase = (avatar) => {
//   db.collection("avatars").add(avatar)
//     .then(res =>  {
//     	avatar.id=res.id;
//       store.dispatch(createAvatar(avatar));
//     })
//     .catch(function(error) {
//         console.error("Error writing document: ", error);
//     });
// }

// export const deleteAvatarFirebase = (avatarId) => {
//   db.collection("avatars").doc(`${avatarId}`).delete()
// 	.then(function() {
// 	    console.log("Document successfully deleted!");
// 	    store.dispatch(deleteAvatar())
// 	}).catch(function(error) {
// 	    console.error("Error removing document: ", error);
// 	});
// }
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
