import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export default Navbar = props => {
  return(
    <div className="navbar">
      <nav className="navbar-setting">
        <div>
          <a>Set Work Interval</a>
          <a>Set Break Interval</a>
        </div>
      </nav>
    </div>
  )
}