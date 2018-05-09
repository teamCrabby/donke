import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWorkInterval, fetchBreakInterval } from '../store'
import { annoyed } from '../library/audio'
import path from 'path'
import { HealthBar } from './index'
import PlaypenForm from './playpenForm'



class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: false,
      workInterval: 0,
      breakInterval: 0,

    }
    this.workBreakForm = this.workBreakForm.bind(this)
    this.handledForm = this.handledForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  workBreakForm(event) {
    console.log('hai im workBreakform', event.target.name)
    this.setState({
      workBreakClicked: !this.state.workBreakClicked,
      playPenFormClicked: false,
      logOutClicked: false,
    })
  }
  handledForm(event) {
    console.log('im handled form', event.target.name)
    this.setState({
      playPenFormClicked: !this.state.playPenFormClicked,
      logOutClicked: false,
      workBreakForm: false
    })
  }
  handleLogOut(event) {
    console.log('hai im handleLogout', event.target.name)
    this.setState({
      logOutClicked: !this.state.logOutClicked,
      workBreakClicked: false,
      playPenFormClicked: false
    })
  }




  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })

  }

  handleSubmit(event, workTime, breakTime, callback) {
    event.preventDefault()
    this.props.getWorkInterval(workTime, breakTime)
    callback()
  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-options">

          <img className="gearImg" src="../img/tool.svg" />
          <img className="gearImg" src="../img/tool.svg" onClick={this.workBreakForm} />
          <img className="gearImg" src="../img/tool.svg" onClick={this.handledForm} />
          <img className="gearImg" src="../img/tool.svg" onClick={this.handleLogOut} />
          <div className="health">
            <HealthBar />
          </div>
        </div>
        {
          this.state.workBreakClicked === true
            ?
            <div className="navbar-wrapper">
              <div className="navbar-work-container">
                <div className="navbar-work">Set Work Interval</div>
                <div className="navbar-work-select">
                  <select name="workInterval" onChange={this.handleChange}>
                    {
                      [0, 1, 3, 10, 20, 30, 40].map((interval, idx) => {
                        return (
                          <option key={idx}>{interval}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="navbar-break-container">
                <div className="navbar-break">Set Break Interval</div>
                <div className="navbar-break-select">
                  <select name="breakInterval" onChange={this.handleChange}>
                    {
                      [0, 1, 5, 10, 20, 30].map((interval, idx) => {
                        return (
                          <option key={idx}>{interval}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <button onClick={(event) => this.handleSubmit(event, this.state.workInterval, this.state.breakInterval, this.handleClicked)}>Set Time</button>
            </div>
            : null
        }
        {
          this.state.playPenFormClicked === true
            ?
            <div>
              <PlaypenForm />
            </div>
            :
            null
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
    getWorkInterval(workTime, breakTime) {
      dispatch(fetchWorkInterval(workTime))
      dispatch(fetchBreakInterval(breakTime))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

