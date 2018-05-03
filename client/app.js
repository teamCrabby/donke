import React, {Component} from 'react'
import {Navbar} from './components'

export default class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="navbar">
        <Navbar />
      </div>
    )
  }
}