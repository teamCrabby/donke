import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWorkInterval, fetchBreakInterval } from '../store'
import { blop } from '../library/audio'

class IntervalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onToggle: this.props.disabled,
      workInterval: '',
      breakInterval: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })

  }

  handleSubmit(event) {
    blop()
    event.preventDefault()
    this.props.getWorkInterval(Number(this.state.workInterval), Number(this.state.breakInterval))
    this.setState({ onToggle: false })
  }

  render() {
    let {status} = this.props
    let warning;
        if (!this.state.workInterval) {
            warning = 'Please enter how much time you want to work before going on a break.'
        } else if ( isNaN ( Number(this.state.workInterval) ) ) {
            warning = "Please enter a work interval in numbers. Hint: '70' = one hour ten minutes."
        } else if ( this.state.workInterval > 120 || this.state.workInterval < 1 ) {
            warning = "Please enter a work interval between two hours (120 minutes) and one minute."
        } else if (!this.state.breakInterval) {
            warning = 'Please enter how long you want your breaks to last.'
        } else if ( isNaN ( Number(this.state.breakInterval) ) ) {
            warning = "Please enter a break interval in numbers. Hint: '10' = ten minutes."
        } else if ( this.state.breakInterval < 5 ) {
            warning = "Please enter a break interval that is at least five minutes long."
        } 
        //disable the button if admin does not behave
        let functional = false;
        if (
            !this.state.workInterval || 
            isNaN ( Number(this.state.workInterval) ) || 
            this.state.workInterval > 120 || this.state.workInterval < 1 || 
            !this.state.breakInterval || 
            isNaN ( Number(this.state.breakInterval) ) ||
            this.state.breakInterval < 5 ) {
            functional = true;
        }
    return (
      (this.state.onToggle === true && status !== 'break')
      ?
          <div className='navbarForm'>
            <div className="navbar-wrapper">
              <form onSubmit={this.handleSubmit} >
                <div className="navbar-container-form">
                  <div className="name-holder">
                    <div className="navbar-name">Set Work Interval</div>
                  </div>
                  <div className="interval-select">
                    <input name="workInterval" type="text" onChange={this.handleChange} value={this.state.workInterval}/>
                    <div className="navbar-name">Rec: 52 minutes</div>
                  </div>
                </div>
                <div className="navbar-container-form">
                  <div className="navbar-name">Set Break Interval</div>
                    <div className="interval-select">
                      <input name="breakInterval" type="text" onChange={this.handleChange} value={this.state.breakInterval}/>
                      <div className="navbar-name">Rec: 17 minutes</div>
                    </div>
                </div>      
                <div className="navbar-container-form"><button id="timeButton" type="submit" disabled={functional}>SET TIME</button></div>
                { warning && <div className='alert'>{warning}</div> }
              </form>
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