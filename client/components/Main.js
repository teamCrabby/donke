import React, {Component} from 'react'
import {Navbar} from './components'

export default class Main extends Component {
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