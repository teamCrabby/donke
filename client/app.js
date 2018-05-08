import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar } from './components'
const firebase = require("firebase");
const secrets = require('../secrets.js')
// Required for side-effects
require("firebase/firestore");

console.log(secrets.API_KEY)
firebase.initializeApp({
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  databaseURL: secrets.DATABASE_URL,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

db.collection("avatars").add({
  name: "Beyonce My Girl"
})
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });

db.collection("avatars").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="animal">
          <SelectDonke />
        </div>
      </div>
    )
  }
}
