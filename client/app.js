import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar, Login, Playpen, Invitation, NewBuddy, Donke } from './components'
import * as firebase from 'firebase' 
import { connect } from 'react-redux'
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
  }

  render() {
    return (
      <div>
        <div className="navbar">
          {!this.props.loggedIn 
            ? <div> <Login /> <Donke /></div>
            : !this.props.avatar.name 
              ? <div> <NewBuddy /> <Donke /> </div>
              : this.props.inPlaypen && this.props.avatar.playpenId && this.props.playpen.id
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
    inPlaypen: state.playpenStatus,
    user: state.user,
    playpen: state.playpen
  }
}

export default connect(mapStateToProps)(App)
