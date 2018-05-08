import React, {Component} from 'react'
const firebase = require("firebase")
const secrets = require('../../secrets.js')
require("firebase/firestore")

firebase.initializeApp({
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  databaseURL: secrets.DATABASE_URL,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID
});

let db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

db.collection("avatars").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render(){
    return(
      <div>
        Login
        <input />
      </div>
    )
  }
}

