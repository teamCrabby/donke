import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWorkInterval, fetchBreakInterval } from '../store'

class IntervalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onToggle: this.props.disabled,
      workInterval: 0,
      breakInterval: 0,

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: Number(event.target.value) })

  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.getWorkInterval(this.state.workInterval, this.state.breakInterval)
    this.setState({ onToggle: false })
  }

  render() {
    let {status} = this.props
    return (
      (this.state.onToggle === true &&  status !== 'break')
      ?
          <div className='navbarForm'>
            <div className="navbar-wrapper">
              <div className="navbar-container-form">
                <div className="navbar-name">Set Work Interval</div>
                <div className="navbar-select">
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
              <div className="navbar-container-form">
                <div className="navbar-name">Set Break Interval</div>
                <div className="navbar-select">
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
              <div className="navbar-container-form"><button id="timeButton" onClick={this.handleSubmit}>SET TIME</button></div>
            </div>
          </div>
      : null
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.status

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