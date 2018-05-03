import React, {Component} from 'react'

export default (props) => {
  return(
    <div className="navbar">
      <a id="navbar-work">Set Work Interval</a>
      <a id="navbar-break">Set Break Interval</a>
      <div className="dropdown">
        <button className="dropdown-btn">
        </button>
        <div className="dropdown-content">
          <a>10</a>
          <a>20</a>
        </div>
      </div>
    </div>
  )
}

