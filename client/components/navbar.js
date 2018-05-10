import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { fetchWorkInterval, fetchBreakInterval } from '../store'
import { annoyed } from '../library/audio'
import path from 'path'
import { HealthBar, PlaypenForm, IntervalForm } from './index'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: false,
      // workInterval: 0,
      // breakInterval: 0,

    }
    this.workBreakForm = this.workBreakForm.bind(this)
    this.handledForm = this.handledForm.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  workBreakForm(event) {
    console.log('hai im workBreakform', event.target.name)
    this.setState({
      playPenFormClicked: false,
      logOutClicked: false,
      workBreakClicked: !this.state.workBreakClicked
    })
  }
  handledForm(event) {
    console.log('im handled form', event.target.name)
    this.setState({
      logOutClicked: false,
      workBreakClicked: false,
      playPenFormClicked: !this.state.playPenFormClicked
    })
  }
  handleLogOut(event) {
    console.log('hai im handleLogout', event.target.name)
    this.setState({
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: !this.state.logOutClicked
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })

  }

  // handleSubmit(event, workTime, breakTime, callback) {
  //   event.preventDefault()
  //   this.props.getWorkInterval(workTime, breakTime)
  //   callback()
  // }

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
            <IntervalForm />
            : null
        }
        {
          this.state.playPenFormClicked === true
            ?
            <div className="playpen-container">
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
    // workInterval: state.workInterval
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getWorkInterval(workTime, breakTime) {
    //   dispatch(fetchWorkInterval(workTime))
    //   dispatch(fetchBreakInterval(breakTime))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

