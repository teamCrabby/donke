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
    console.log('STATE', this.state.clicked)
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
                  <option>{10}</option>
                </select>
              </div>
            </div>
            <div className="navbar-break-container">
              <div className="navbar-break">Set Break Interval</div>
                <div className="navbar-break-select">
                    {/* <a>{10}</a>
                    <a>{20}</a>
                    <a>{30}</a> */}
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

