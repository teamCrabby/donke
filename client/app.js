import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar, Login, Playpen } from './components'

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
          <Playpen />
        </div>
        <div className="animal">
          <SelectDonke />
        </div>
      </div>
    )
  }
}
