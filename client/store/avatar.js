import {db, auth} from '../app'
import store from './index.js'

/**
 * ACTION TYPES
 */
const CREATE_AVATAR = 'CREATE_AVATAR'

const DELETE_AVATAR = 'DELETE_AVATAR'

const UPDATE_AVATAR = 'UPDATE_AVATAR_HEALTH'

/**
 * INITIAL STATE
 */

const defaultAvatar = {
	name: '',
	userId: '',
	health: '',
	playpenId: '',
	invited: ''
}


/**
 * ACTION CREATORS
 */
const createAvatar = (avatar) => ({ type: CREATE_AVATAR, avatar })

const deleteAvatar = () => ({ type: DELETE_AVATAR });
 
const updateAvatar = (updatedAvatar) => ({ type: UPDATE_AVATAR, updatedAvatar})

/**
 * FIRESTORE + LOCAL STORE UPDATERS
 */
export const createAvatarFirebase = (avatar) => {
  db.collection("avatars").add(avatar)
    .then(res =>  {
    	avatar.id=res.id;
      store.dispatch(createAvatar(avatar));
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export const deleteAvatarFirebase = (avatarId) => {
  db.collection("avatars").doc(`${avatarId}`).delete()
	.then(function() {
	    console.log("Document successfully deleted!");
	    store.dispatch(deleteAvatar())
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});
}

export const updateAvatarFirebase = (updatedAvatar) => {
  db.collection("avatars").doc(`${updatedAvatar.id}`).update({
    name: updatedAvatar.name,
    userId: updatedAvatar.userId,
    health: updatedAvatar.health,
    playpenId: updatedAvatar.playpenId,
    invited: updatedAvatar.invited
  })
  .then(() => {
    store.dispatch(updateAvatar(updatedAvatar))
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  })
}
/**
 * REDUCER
 */
export default function (state = defaultAvatar, action) {
  switch (action.type) {
    case CREATE_AVATAR:
      return action.avatar;
     case DELETE_AVATAR: 
   	  return defaultAvatar;
    case UPDATE_AVATAR:
      return action.updatedAvatar
    default:
      return state;
  }
}
