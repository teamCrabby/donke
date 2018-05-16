import { db, auth } from '../app'
import store from './index.js'

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
export const getPlaypenFirebase = (playpenId) =>
    dispatch => 
        db.collection("playpens").doc(`{playpenId}`)
        .get()
        .then(res => {
            playpen.id = res.id;
            store.dispatch(setPlaypen(playpen));
        })
        .catch((error) => console.log('unable to '));

export const updatePlaypenFirebase = (changedPlaypen) =>
    dispatch =>
        db.collection('playpens').doc(`${changedPlaypen.id}`)
        .update(changedPlaypen)
        .then(res => {
            return db.collection('playpens').doc(`${changedPlaypen.id}`)
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
        db.collection("playpens").doc(`${playpenId}`).delete()
            .then(function () {
                console.log("Document successfully deleted!");
                store.dispatch(deletePlaypen())
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });


/**
 * REDUCER
 */
export default function (state = defaultPlaypen, action) {
    switch (action.type) {
        case SET_PLAYPEN:
            return action.playpen;
        case DELETE_PLAYPEN:
            return defaultPlaypen;
        case UPDATE_PLAYPEN:
            return Object.assign({}, state, action.playpen);
        default:
            return state;
    }
}
