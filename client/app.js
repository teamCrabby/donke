import React, { Component } from 'react'
import { Navbar, Heart, SpeechBubble, SelectDonke, PartyHat, HealthBar } from './components'

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
        <div>
          <SelectDonke />
          <HealthBar />
          <PartyHat />
        </div>
      </div>
    )
  }
}
