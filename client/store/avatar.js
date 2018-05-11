import {db, auth} from '../app'
import store from './index.js'

/**
 * ACTION TYPES
 */
const CREATE_AVATAR = 'CREATE_AVATAR'

const DELETE_AVATAR = 'DELETE_AVATAR'

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

const deleteAvatar = () => ({ type: DELETE_AVATAR })

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
/**
 * REDUCER
 */
export default function (state = defaultAvatar, action) {
  switch (action.type) {
    case CREATE_AVATAR:
      return action.avatar;
     case DELETE_AVATAR: 
   	  return defaultAvatar;
    default:
      return state;
  }
}
