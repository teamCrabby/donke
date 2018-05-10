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

    }
    this.handleWorkBreakForm = this.handleWorkBreakForm.bind(this)
    this.handlePlayPenForm = this.handlePlayPenForm.bind(this)
    this.handleCloseForms = this.handleCloseForms.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleCloseForms(event) {
    this.setState({
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: false,
    })
  }

  handleWorkBreakForm(event) {
    console.log('hai im workBreakform', event.target.name)
    this.setState({
      playPenFormClicked: false,
      logOutClicked: false,
      workBreakClicked: !this.state.workBreakClicked
    })
  }
  handlePlayPenForm(event) {
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

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-options">

          <img className="gearImg" src="../img/tool.svg" onClick={this.handleCloseForms} />
          <img className="gearImg" src="../img/hourglass-2.svg" onClick={this.handleWorkBreakForm} />
          <img className="gearImg" src="../img/diamond.svg" onClick={this.handlePlayPenForm} />
          <img className="gearImg" src="../img/locked-1.svg" onClick={this.handleLogOut} />
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

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

