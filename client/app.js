import React, {Component} from 'react'
import {Navbar, Donke} from './components'

export default class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div>
        <Donke />
        </div>
      </div>
    )
  }
}
