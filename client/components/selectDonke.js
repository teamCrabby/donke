import React, { Component } from 'react';
import Donke from './donke';
import DonkeSick from './donkeSick';
import DonkeDead from './donkeDead';
import SpeechBubble from './speechBubble';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';
import store, { fetchHealth } from '../store'

let timerFunc;
let healthFunc;

export class SelectDonke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      workTime: true,
    }
    this.handleClickWork = this.handleClickWork.bind(this)
    this.handleClickBreak = this.handleClickBreak.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
    this.needBreak = this.needBreak.bind(this)
  }

  componentDidUpdate(){
    if (this.props.workInterval > 0 && this.state.start){
      this.workTimer()
    }
  }

  workTimer() {
    this.setState({start: false})
    const workInterval = this.props.workInterval * 1000
    timerFunc = setTimeout(() => {
      playAudio('happy');
      this.needBreak()
    }, workInterval)
    //console logs
      // console.log('in worktimer setting timeout', timerFunc)
  }

  needBreak() {
    healthFunc = setInterval(() => {
      if(this.props.health > 0){
        this.props.setStoreHealth(this.props.health - 1)
      }
    }, 1000)
    //console logs
      // console.log("in needBreak setting interval", healthFunc)
  }

  breakTimer() {
    // const breakInterval = this.props.breakInterval * 1000;
    healthFunc = setInterval(() => {
      if (this.props.health < 10 ){
        this.props.setStoreHealth(this.props.health + 1)
      }
    }, 1000);
    //console logs
      //console.log('in break timer setting interval', healthFunc)
  }

  handleClickBreak() {
    //console logs
      // console.log("in handleClickBreak")
      // console.log("clearing setTimeout", timerFunc)
      // console.log('clearing setInterval', healthFunc);
    clearTimeout(timerFunc)
    clearInterval(healthFunc)
    this.setState({ workTime: false })
    this.breakTimer()
  }

  handleClickWork() {
    //console logs
      // console.log('in handleClickWork');
      // console.log('clearing setTimeout', timerFunc);
      // console.log('clearing setInterval', healthFunc);
    clearInterval(healthFunc);
    clearTimeout(timerFunc)
    this.setState({ workTime: true });
    this.workTimer()
  }


  render() {
    return (
      this.props.workInterval > 0
        //if the user has submitted time specifications timer is running and render is dependent on timer
        ? <div>
          <div>
            <p>Health: {this.props.health}</p>
            {this.props.health < 10
              ? this.props.health === 0
                ? <DonkeDead/>
                : <DonkeSick />
              : <Donke />}
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
    breakInterval: state.breakInterval,
    health: state.health
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    setStoreHealth(health) {
      dispatch(fetchHealth(health))
    }
  }}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDonke)
