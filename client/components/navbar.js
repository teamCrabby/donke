import React, {Component} from 'react'

export default class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      clicked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ clicked : !this.state.clicked})
  }

  render(){
   
    return(
      <div className="navbar-container">
          <div className="navbar-options">
            <img src="../img/tool.svg" onClick={this.handleChange} />
          </div>
          {
            this.state.clicked === true
            ?
          <div className="navbar-wrapper">
            <div className="navbar-work-container">
              <div className="navbar-work">Set Work Interval</div>
              <div className="navbar-work-select">
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
            <div className="navbar-break-container">
              <div className="navbar-break">Set Break Interval</div>
                <div className="navbar-break-select">
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
          </div>
          : null
          }
      </div>
    )
  }
}

