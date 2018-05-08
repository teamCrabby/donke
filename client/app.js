import React, { Component } from 'react';
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar, Login } from './components'

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
