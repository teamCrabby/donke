import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar, Login } from './components'
import * as firebase from 'firebase' 
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

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
          <Login />
        </div>
        <div className="animal">
          <SelectDonke />
        </div>
      </div>
    )
  }
}
