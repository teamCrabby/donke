import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar, Login, Playpen } from './components';
import firebase from 'firebase';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.avatar = firebase.firestore().collection('avatars').doc('RLAstb3EigfEWlhL1I4m')
    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount() {
    this.farts = this.avatar.onSnapshot(this.onUpdate);
  }
  componentWillUnmount() {
    this.farts();
  }

  onUpdate (snapshot) {
    console.log('SNAPSHOT', snapshot.data())
  };

  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
          <Login />
        </div>
        <div className="animal">
          {
          //<SelectDonke />
          }
          <Playpen />
        </div>
      </div>
    )
  }
}
