import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar, Login, Playpen, Invitation, NewBuddy, Donke } from './components'
import * as firebase from 'firebase' 
import { connect } from 'react-redux'
// import { updateAvatar } from './store'
const secrets = require('../secrets.js')
require("firebase/firestore")


firebase.initializeApp({
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  databaseURL: secrets.DATABASE_URL,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID
});

export const db = firebase.firestore();
export const auth = firebase.auth()
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export class App extends Component {
  constructor(props) {
    super(props)
   // this.avatar = db.collection('avatars').doc(`${this.props.avatar.id}`)
    // this.onUpdate = this.onUpdate.bind(this)
  }

  // componentDidUpdate() {
  //   //this works (see console for printout). You can update the avatar and you will get 
  //   //a new snapshot. The doc id is just a sample from our database. 
  //   // if (this.props.avatar.id) {
  //   // this.unsubscribe = db.collection('avatars').doc(`${this.props.avatar.id}`).onSnapshot((doc)=> {
  //   //   var source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
  //   //   console.log(source, ' data: ', doc.data());
  //   //   let updatedAvatar = doc.data()
  //   //   this.onUpdate(updatedAvatar)
  //   // });
  //   // }
  //   if (this.props.avatar.id){
  //     db.collection('avatars').doc(`${this.props.avatar.id}`)
  //       .get()
  //       .then((returnedAvatar) => {
  //         const firebaseAvatar = returnedAvatar.data()
  //         this.unsubscribe = db.collection('avatars').doc(`${this.props.avatar.id}`).onSnapshot((snapshot) => {
  //           if (this.props.avatar.invited !== firebaseAvatar.invited) {
  //             let updatedAvatar = snapshot.data()
  //             this.onUpdate(snapshot)
  //           }
  //         })
  //       })
  //   }
  // }
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // onUpdate(updatedAvatar) {
  //   console.log('SNAPSHOT', updatedAvatar)
  //   this.props.updateAvatarStore(updatedAvatar)
  // };

//want their invitation to show up regardless of what stage they are in
//want it to pop up on top of everything else
//once they accept in a playpen, want the intervals to clear, and they set a new work/break interval for the playpen that applies to everyone
//want it to show their current health but be on the same timer now
//

  render() {
    return (
      <div>
        <div className="navbar">
          {!this.props.loggedIn 
            ? <div> <Login /> <Donke /></div>
            : !this.props.avatar.name 
              ? <div> <NewBuddy /> <Donke /> </div>
              : this.props.inPlaypen
                ? <div> <Navbar/> <Playpen /> </div>
                : <div> <Navbar /> <SelectDonke />
                  {this.props.avatar.invited
                  ? <div> <Invitation /></div>
                  : null}
              </div> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    avatar: state.avatar,
    workInterval: state.workInterval,
    inPlaypen: state.playpenStatus
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     updateAvatarStore(updatedAvatar) {
//       dispatch(updateAvatar(updatedAvatar));
//     }
//   };
// };

export default connect(mapStateToProps)(App)
