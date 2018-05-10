import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWorkInterval, fetchBreakInterval } from '../store'

class IntervalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workInterval: 0,
      breakInterval: 0,

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      <div className="navbar-wrapper">
        <div className="navbar-container-form">
          <div className="navbar-name">Set Work Interval</div>
          <div className="navbar-select">
            <select name="interval" onChange={this.handleChange}>
              {
                [0, 1, 3, 10, 20, 30, 40].map((interval, idx) => {
                  return (
                    <option key={idx} className="options">{interval}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className="navbar-container-form">
          <div className="navbar-name">Set Break Interval</div>
          <div className="navbar-select">
            <select name="interval" onChange={this.handleChange}>
              {
                [0, 1, 5, 10, 20, 30].map((interval, idx) => {
                  return (
                    <option key={idx} className="options">{interval}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <button onClick={(event) => this.handleSubmit(event, this.state.workInterval, this.state.breakInterval, this.handleClicked)}>SET TIME</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntervalForm)