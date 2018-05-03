import React, { Component } from 'react'
import { Navbar, DonkeSick, DonkeDead, Heart } from './components'

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

          {/*<DonkeDead />*/}
          <Heart />
        </div>
      </div>
    )
  }
}
