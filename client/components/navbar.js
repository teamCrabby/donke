import React, {Component} from 'react'

export default (props) => {
  return(
    <div className="navbar">
        <div className="navbar-work">Set Work Interval</div>
        {/* <div className="dropdown"> */}
          {/* <div className="dropdown-content"> */}
        <div className="navbar-break">Set Break Interval</div>
          <div className="break-interval">
            <select>
              {
                [10,20,30].map(interval => {
                return (
                <option>{interval}</option>
                )})
              }
            </select>
          </div>
    </div>
  )
}

