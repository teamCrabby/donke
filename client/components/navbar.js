import React, {Component} from 'react'

export default class Navbar extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
      <div className="navbar-container">
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
}

