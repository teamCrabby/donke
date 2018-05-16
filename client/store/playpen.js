import { db, auth } from '../app'
import store from './index'

/**
 * ACTION TYPES
 */
const SET_PLAYPEN = 'SET_PLAYPEN'
const DELETE_PLAYPEN = 'DELETE_PLAYPEN'
const UPDATE_PLAYPEN = 'UPDATE_PLAYPEN'

/**
 * INITIAL STATE
 */

const defaultPlaypen = {}


/**
 * ACTION CREATORS
 */

export const setPlaypen = (playpen) => ({ type: SET_PLAYPEN, playpen })
export const updatePlaypen = playpen => ({ type: UPDATE_PLAYPEN, playpen });
export const deletePlaypen = () => ({ type: DELETE_PLAYPEN });

/**
 * FIRESTORE + LOCAL STORE UPDATERS
 */

export const addPlaypenFirebase = (playpen) => 
    dispatch => 
        db.collection("playPen")
        .add(playpen)
        .then(res => {
            let playpenId = res.id
            dispatch(getPlaypenFirebase(playpenId))
            return playpenId
        })
        .then((playpenId) => 
            playpen.avatars.map(avatar => {
                let bool = true;
                if (playpen.owner.uid === avatar.userId) {
                    bool = false
                } 
                db.collection('avatars').doc(avatar.id).update({
                    invited: bool,
                    playpenId
                })
                .then(() => console.log('updated!'))
            })
        )
        .catch((error) => console.log("ERROR", error));



export const getPlaypenFirebase = (playpenId) =>
    dispatch => 
        db.collection("playPen").doc(playpenId)
        .get()
        .then(res => {
            console.log('playpen from firebase is..', playpen)
            let playpen = res.data()
            playpen.id = playpenId
            dispatch(setPlaypen(playpen))
        })
        .catch((error) => console.log(`unable to get playpen ${error}`));


export const updatePlaypenFirebase = (changedPlaypen) =>
    dispatch =>
        db.collection('playPen').doc(`${changedPlaypen.id}`)
        .update(changedPlaypen)
        .then(res => {
            return db.collection('playPen').doc(`${changedPlaypen.id}`)
            .get()
            .then(res => {
                let updatedPlaypen = res.data()
                updatedPlaypen.id = res.id;
                return updatedPlaypen;
            })
        })
        .then(playpen => {
            dispatch(updatePlaypen(playpen))
        })
        .catch(error => console.error(`Error updating avatar ${error}`))


export const deletePlaypenFirebase = (playpenId) => 
    dispatch => 
        db.collection("playPen").doc(`${playpenId}`)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
                dispatch(deletePlaypen())
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });


/**
 * REDUCER
 */
export default function (state = defaultPlaypen, action) {
    switch (action.type) {
        case SET_PLAYPEN:
            console.log("in set playpen store")
            return action.playpen;
        case DELETE_PLAYPEN:
            return defaultPlaypen;
        case UPDATE_PLAYPEN:
            return Object.assign({}, state, action.playpen);
        default:
            return state;
    }
}
