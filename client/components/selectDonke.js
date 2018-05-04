import React, { Component } from 'react';
import Donke from './donke';
import DonkeSick from './donkeSick';
import SpeechBubble from './speechBubble';
import { connect } from 'react-redux';

let timerFunc;
let healthFunc;

export class SelectDonke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      workTime: true,
      health: 10,
    }
    this.handleClickWork = this.handleClickWork.bind(this)
    this.handleClickBreak = this.handleClickBreak.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
    this.needBreak = this.needBreak.bind(this)
    

  }

  //Sound when work time ends
  //Message that says "time for a break!" (alert for now)
  //Five minutes into "need a break", you lose a point and every five minutes thereafter
  //You gain one point every time you take your whole break

  componentDidMount() {
    // let counter = 0;
    // let counting = setInterval(() => {
    //   counter++;
    //   console.log(counter);
    // }, 1000);
  }

  componentDidUpdate(){
    if (this.props.workInterval > 0 && this.state.start){
      this.workTimer()
    }
  }

  workTimer() {
    console.log('in worktimer')
    this.setState({start: false})
    const workInterval = this.props.workInterval * 1000
    let timerFunc = setTimeout(() => {
      alert("I'm tired, time for a break!")
      this.needBreak()
    }, workInterval)
  }

  needBreak() {
    console.log("in needBreak")
    healthFunc = setInterval(() => {
      console.log("decrement health")
      this.setState({ health: this.state.health - 1 })
    }, 1000)
    console.log("health func in needBreak...", healthFunc)
  }

  breakTimer() {
    console.log('in break timer')
    console.log("healthFunc in breakTimer...", healthFunc)
    // const breakInterval = this.props.breakInterval * 1000;
    healthFunc = setInterval(() => {
      if (this.state.health < 10 ){
        this.setState({ health: this.state.health + 1 });
      }
    }, 1000);
    //console.log("breakTimeout is....", breakTimeout)
  }

  handleClickBreak() {
    console.log("healthFunch in handleClick...", healthFunc)

    clearTimeout(timerFunc)
    clearInterval(healthFunc)
    this.setState({ workTime: false })
    this.breakTimer()
  }

  handleClickWork() {
    clearInterval(healthFunc);
    this.setState({ workTime: true });
    this.workTimer()
  }


  render() {
    return (
      this.props.workInterval > 0
        //if the user has submitted time specifications timer is running and render is dependent on timer
        ? <div>
          <div>
            <p>Health: {this.state.health}</p>
            {this.state.health === 10
              ? <Donke />
              : <DonkeSick />}
            {this.state.workTime
              ? <div>
                <button onClick={this.handleClickBreak}>Take a break!</button>
              </div>
              : <div>
                <button onClick={this.handleClickWork}>Work time!</button>
              </div>}
          </div>
        </div>
        //if the user has not submitted time specifications, just render happy donke
        : <Donke />
    )
  }
}


const mapStateToProps = state => {
  return {
    workInterval: state.workInterval,
    breakInterval: state.breakInterval
  }
}

const mapDispatchToProps = dispatch => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(SelectDonke)