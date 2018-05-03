import React, { Component } from 'react'
import { Navbar, DonkeSick, DonkeDead } from './components'

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
          <DonkeDead />
        </div>
      </div>
    )
  }
}
