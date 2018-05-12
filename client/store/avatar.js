import {db, auth} from '../app'
import store from './index.js'

/**
 * ACTION TYPES
 */
const CREATE_AVATAR = 'CREATE_AVATAR'
const DELETE_AVATAR = 'DELETE_AVATAR'
const SET_INVITED = 'SET_INVITED'
const UPDATE_AVATAR = 'UPDATE_AVATAR'

/**
 * INITIAL STATE
 */

const defaultAvatar = {
	name: '',
	userId: '',
	health: '',
	playpenId: '',
  invited: '',
  id: ''
}


/**
 * ACTION CREATORS
 */
const createAvatar = (avatar) => ({ type: CREATE_AVATAR, avatar })
export const updateAvatar = (avatar) => ({ type: UPDATE_AVATAR, avatar})
const deleteAvatar = () => ({ type: DELETE_AVATAR })
export const setInvited = (bool) => ({ type: SET_INVITED, bool })

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

export const updateAvatarFirebase = (avatarId, avatarName) => {
  db.collection('avatars').doc(avatarId).update({
    name: avatarName
  })
  .then(res => {
    return db.collection('avatars').doc(avatarId).get()
    .then(res => {
      let updatedAvatar = res.data()
      updatedAvatar.id = res.id
      return updatedAvatar
    })
  })
  .then(avatar => {
    console.log('UPDATED AVATAR', avatar)
    store.dispatch(updateAvatar(avatar))
  })
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
    case UPDATE_AVATAR:
      return Object.assign({}, state, action.avatar );
    case SET_INVITED:
      return Object.assign({}, state, {invited: action.bool});
    default:
      return state;
  }
}
