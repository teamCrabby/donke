import React, { Component } from 'react';
import { Donke, PartyHat, Cloud, Sun, Grass, Halo, SpeechBubble, Lightning, SleepingDonke } from './index';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';
import store, { fetchHealth, fetchWorkInterval, fetchBreakInterval, fetchStatus } from '../store';
import { sunLeave, sunFaceLeave } from '../library/animations';

let timerFunc;
let healthFunc;
let breakCountFunc;

export class SelectDonke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      breakCounter: 0,
      breakTimeOver: false,
      needBreakMessage: false
    }
    this.handleClickWork = this.handleClickWork.bind(this)
    this.handleClickBreak = this.handleClickBreak.bind(this)
    this.handleClickTryAgain = this.handleClickTryAgain.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
    this.needBreak = this.needBreak.bind(this)
    this.sunOut = this.sunOut.bind(this)
  }

  componentDidUpdate() {
    if (this.props.workInterval > 0 && this.state.start) {
      this.workTimer()
    }
  }

  changeFullScreen() {
    let win = window.require('electron').remote.getCurrentWindow()
    win.isFullScreen() === false ? win.setFullScreen(true) : win.setFullScreen(false)
  }

  workTimer() {
    this.setState({ start: false })
    const workInterval = this.props.workInterval * 1000
    timerFunc = setTimeout(() => {
      this.setState({needBreakMessage: true})
      playAudio();
      this.props.setStoreStatus('needBreak')
      this.needBreak()
    }, workInterval)
    //console logs
      // console.log('in worktimer setting timeout', timerFunc)
  }

  needBreak() {
    healthFunc = setInterval(() => {
      this.setState({needBreakMessage: false})
      if (this.props.health > 0) {
        this.props.setStoreHealth(this.props.health - 1)
      }
    }, 5000)
    //console logs
      // console.log("in needBreak setting interval", healthFunc)
  }

  breakTimer() {
    healthFunc = setInterval(() => {
      if (this.props.health < 10) {
        this.props.setStoreHealth(this.props.health + 1)
      }
      this.setState({breakTimeOver: true})
    }, this.props.breakInterval * 1000);
    breakCountFunc = setInterval(() => {
      this.setState({breakCounter: this.state.breakCounter += 1})
      if(Math.abs(this.state.breakCounter - this.props.idleTime) > 5 && this.state.breakCounter < this.props.breakInterval){
        alert("Looks like you came back early. Remember that your Creature can't stay healthy if you don't!")
        //this line docks you a point if you come back early. 
        this.props.setStoreHealth(this.props.health - 1)
        this.handleClickWork()
      }
    }, 1000)
  }

  handleClickBreak() {
    this.changeFullScreen()
    clearTimeout(timerFunc)
    clearInterval(healthFunc)
    this.props.setStoreStatus('break')
    this.breakTimer()
  }

  handleClickWork() {
    //console logs
      // console.log('in handleClickWork');
      // console.log('clearing setTimeout', timerFunc);
      // console.log('clearing setInterval', healthFunc);
      // cb()
    this.changeFullScreen()
    clearInterval(breakCountFunc)
    clearInterval(healthFunc);
    clearTimeout(timerFunc)
    this.setState({ workTime: true, breakCounter: 0, breakTimeOver: false });
    this.props.setStoreStatus('working')
    this.workTimer()
  }

  handleClickTryAgain() {
    clearInterval(healthFunc)
    clearTimeout(timerFunc)
    this.setState({ workTime: true })
    this.props.setStoreHealth(10)
    this.props.getWorkInterval(0, 0)
    this.setState({ start: true })
  }

  sunOut() {
    sunLeave();
  }


  render() {
    return (
      this.props.workInterval > 0
        //if the user has submitted time specifications timer is running and render is dependent on timer
        ? this.props.status !== 'break'
        ? <div> 
          {this.props.health > 0
            ? <button id="donkeBtn"onClick={this.handleClickBreak}>Take a break!</button>
            : <button id="donkeBtn" onClick={this.handleClickTryAgain}>Try Again</button>}
            <Donke />
            {this.props.health === 10 
              ? this.props.status === 'needBreak' 
                ? <div> <Sun /> <Grass /> <PartyHat /> <SpeechBubble text={"Time for a break!"} /></div> 
                : <div> <Sun /> <Grass /> <PartyHat /> </div>
              : null}
            {this.props.health === 9 
              ? this.props.status === 'needBreak'
                ? this.state.needBreakMessage
                  ? <div> <Sun /> <Grass /> <PartyHat /> <SpeechBubble text={"Time for a break!"} /></div>
                  : <div> <Sun /> <Grass /> <PartyHat /> <SpeechBubble text={"No break?"} /></div> 
                : <div> <Sun /> </div>
              : null}
            {this.props.health === 8 
              ? this.state.needBreakMessage
                ? <div> <Sun /> <Cloud /> <SpeechBubble text={"Time for a break!"} /></div> 
                : <div> <Sun /> <Cloud /> </div>
              : null}
            {8 > this.props.health > 3 
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <SpeechBubble text={"Time for a break!"} /> </div> 
                : <div> <Cloud /> </div> 
              : null}
            {/*{this.props.health === 6 
              ? this.state.needBreakMessage
                ? <div> <Cloud /> </div> 
                : <div> <Cloud /> </div>
              : null}
            {this.props.health === 5 ? <div> <Cloud /> </div> : null}
            {this.props.health === 4 ? <div> <Cloud /> </div> : null}*/}
            {this.props.health === 3 
              ? this.props.status === 'needBreak'
                ? this.state.needBreakMessage
                  ? <div> <Cloud /> <Lightning /> <SpeechBubble text={"Time for a break!"} /></div>
                  : <div> <Cloud /> <Lightning /> <SpeechBubble text={"I'm so tired. Can we take a break now?"} /></div>
                : <div> <Cloud /> <Lightning /></div>
              : null}
            {this.props.health === 2 
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <Lightning /> <SpeechBubble text={"Time for a break!"}/> </div> 
                : <div> <Cloud /> <Lightning /> </div>
              : null}
            {this.props.health === 1 
              ? this.props.status === 'needBreak'
                ? this.state.needBreakMessage
                  ? <div> <Cloud /> <Lightning /><SpeechBubble text={"Time for a break!"} /></div>
                  : <div> <Cloud /> <Lightning/><SpeechBubble text={"I don't feel so well..."} /></div> 
                : <div> <Cloud /> <Lightning /></div>
              : null}
            {this.props.health === 0 ? <div><Halo /><Cloud /><Lightning/></div> : null}
          </div>
        : this.state.breakTimeOver
          ? <div> <button id="donkeBtn" onClick={this.handleClickWork}>Work time!</button> <SleepingDonke /> </div>
          : <div><SleepingDonke/></div>
        //if the user has not submitted time specifications, just render happy donke
        : <div><Donke /></div>
    )
  }
}


const mapStateToProps = state => {
  return {
    workInterval: state.workInterval,
    breakInterval: state.breakInterval,
    health: state.health,
    idleTime: state.idleTime,
    status: state.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStoreStatus(status) {
      dispatch(fetchStatus(status))
    },
    setStoreHealth(health) {
      dispatch(fetchHealth(health))
    },
    getWorkInterval(workTime, breakTime) {
      dispatch(fetchWorkInterval(workTime))
      dispatch(fetchBreakInterval(breakTime))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDonke)
