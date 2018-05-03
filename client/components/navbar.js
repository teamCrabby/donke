import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWorkInterval} from '../store'

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      clicked: false,
      workInterval: 0,
      breakInterval: 0,
    }
    this.handleClicked = this.handleClicked.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClicked(event) {
    this.setState({ clicked : !this.state.clicked})
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleSubmit(event){
    this.props.getWorkInterval(this.state.workInterval)
  }

  render(){
    console.log(this.props)
    return(
      <div className="navbar-container">
          <div className="navbar-options">
            <img src="../img/tool.svg" onClick={this.handleClicked} />
          </div>
          {
            this.state.clicked === true
            ?
          <div className="navbar-wrapper">
            <div className="navbar-work-container">
              <div className="navbar-work">Set Work Interval</div>
              <div className="navbar-work-select">
                <select name="workInterval" onChange={this.handleChange}>
                  {
                  [10,20,30,40].map((interval, idx) => {
                    return (
                    <option key={idx}>{interval}</option>
                    )})
                  }
                </select>
              </div>
            </div>
            <div className="navbar-break-container">
              <div className="navbar-break">Set Break Interval</div>
                <div className="navbar-break-select">
                  <select name="breakInterval" onChange={this.handleChange}>
                  {
                    [1, 5,10,20,30].map((interval,idx) => {
                    return (
                    <option key={idx}>{interval}</option>
                    )})
                  }
                  </select>
                </div>
            </div>
            <button onClick={this.handleSubmit}>Set Time</button>
          </div>
          : null
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    workInterval: state.workInterval
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWorkInterval(time){
      dispatch(fetchWorkInterval(time))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

