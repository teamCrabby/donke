import {db, auth} from '../app'
import store from './index.js'

/**
 * ACTION TYPES
 */
const SET_AVATAR = 'SET_AVATAR'
const DELETE_AVATAR = 'DELETE_AVATAR'
const UPDATE_AVATAR = 'UPDATE_AVATAR'
const SET_INVITED = 'SET_INVITED'

// const UPDATE_AVATAR = 'UPDATE_AVATAR_HEALTH'

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

export const setAvatar = (avatar) => ({ type: SET_AVATAR, avatar })
export const updateAvatar = (avatar) => ({ type: UPDATE_AVATAR, avatar})
export const deleteAvatar = () => ({ type: DELETE_AVATAR })
export const setInvited = (bool) => ({ type: SET_INVITED, bool })

/**
 * FIRESTORE + LOCAL STORE UPDATERS
 */
export const createAvatarFirebase = (avatar) => 
    db.collection("avatars").add(avatar)
      .then(res =>  {
        avatar.id=res.id;
        store.dispatch(setAvatar(avatar));
      })
      .catch(function(error) {
      });

export const updateAvatarFirebase = (changedAvatar) => 
  dispatch => 
    db.collection('avatars').doc(`${changedAvatar.id}`).update(changedAvatar)
    .then(res => {
      return db.collection('avatars').doc(`${changedAvatar.id}`).get()
      .then(res => {
        let updatedAvatar = res.data()
        updatedAvatar.id = res.id
        return updatedAvatar
      })
    })
    .then(avatar => {
      dispatch(updateAvatar(avatar))
    })
    .catch(error => console.error(`Error updating avatar ${error}`))


export const deleteAvatarFirebase = (avatarId) => {
  console.log('GOT INSIDE DELETE AVATAR FIREBASE')
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
    case SET_AVATAR:
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
