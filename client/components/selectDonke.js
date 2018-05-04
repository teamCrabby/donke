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
      workTime: true,
      needBreak: false,
      health: 5,
    }
    this.handleClickWork = this.handleClickWork.bind(this)
    this.handleClickBreak = this.handleClickBreak.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
    this.needBreak = this.needBreak.bind(this)

  }
  //when it first mounts, donke is happy
  //once user puts in time intervals, donke is happy, render button that says 'take a break', message that says 'happy working!'
  //after a set time, donke is sick, message says 'i need a break!', health starts decrementing
  //if click 'take a break', donke is happy, health is incrementing, button says 'back to work!'
  //if click 'back to work', donke is happy, button says 'take a break', work timer starts


  //work time runs out... donkey gets sad and health starts decrementing
  //click 'take a break'... health starts incrementing, button changes to 'back to work'
  //once health is full, donkey is happy

  componentDidMount() {
    // let counter = 0;
    // let counting = setInterval(() => {
    //   counter++;
    //   console.log(counter);
    // }, 1000);
  }

  // componentDidUpdate(){
  //   if (this.state.needBreak){
  //     console.log('in need break')
  //     this.needBreak()
  //   }
  // }

  workTimer() {
    console.log('in worktimer')
    const workInterval = this.props.workInterval * 1000
    let timerFunc = setTimeout(() => {
      this.needBreak()
    }, workInterval)
  }

  needBreak() {
    console.log("in needBreak")
    healthFunc = setInterval(() => {
      //console.log("health", this.state.health)
      this.setState({ health: this.state.health - 1 })
    }, 3000)
  }

  breakTimer() {
    console.log('in break timer')
    const breakInterval = this.props.breakInterval * 1000;
    while(this.state.health < 5){
    healthFunc = setInterval(() => {
      this.setState({ health: this.state.health + 1 });
    }, 3000);
    }
    //console.log("breakTimeout is....", breakTimeout)
  }

  handleClickBreak() {
    console.log('in handleClickBreak need break')
    clearTimeout(timerFunc)
    clearInterval(healthFunc)
    // this.setState({ needBreak: false, workTime: false })
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
          {this.workTimer()}
          <div>
            {/*<p>{this.state.health}</p>*/}
            {this.state.health === 5
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