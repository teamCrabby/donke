import React, { Component } from 'react';
import { Donke, PartyHat, Cloud, Sun, Grass, Halo, SpeechBubble, Lightning, SleepingDonke, Playpen } from './index';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';
import store, {fetchWorkInterval, fetchBreakInterval, fetchStatus, deleteAvatarFirebase, updateAvatarFirebase} from '../store';

//create timer variables so can assign them in order to clear them
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
  }


  componentDidUpdate(prevProps) {
    //this is for when the user resets their interval while they are working -- need to clear existing intervals and restart
    if (prevProps.breakInterval !== this.props.breakInterval || prevProps.workInterval !== this.props.workInterval) {
      clearInterval(breakCountFunc);
      clearInterval(healthFunc);
      clearTimeout(timerFunc);
      this.setState({ start: true })
    }
    if (this.props.workInterval > 0 && this.state.start) {
      this.workTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(healthFunc);
    clearTimeout(timerFunc);
    this.props.getWorkInterval(0, 0)
    //this.props.setStartTimer(true)
    this.props.setStoreStatus('working')
  }

  workTimer() {
    this.setState({ start: false })
    const workInterval = this.props.workInterval * 1000
    //start the work timer for the specified interval
    timerFunc = setTimeout(() => {
      //send the 'need a break' message when the timer runs out
      this.setState({ needBreakMessage: true })
      //play donkey sound
      playAudio();
      this.props.setStoreStatus('needBreak')
      //start need break timer
      this.needBreak()
    }, workInterval)
  }

  needBreak() {
    healthFunc = setInterval(() => {
      this.setState({ needBreakMessage: false })
      //decrement the health by 1 every 5 minutes
      if (this.props.avatar.health > 0) {
        let updatedAvatar = Object.assign({}, this.props.avatar, { health: this.props.avatar.health - 1 })
        this.props.setStoreHealth(updatedAvatar)
      }
    }, 5000)
  }

  breakTimer() {
    //I THINK WE NEED A SETTIMEOUT HERE
    healthFunc = setInterval(() => {
      //increment the health once their break is complete (and if they take a longer break....?)
      if (this.props.avatar.health < 10) {
        let updatedAvatar = Object.assign({}, this.props.avatar, { health: this.props.avatar.health + 1 })
        this.props.setStoreHealth(updatedAvatar)
      }
      //the line below lets the render know to show the "Work time" button
      this.setState({ breakTimeOver: true })
    }, this.props.breakInterval * 1000);
    //check that the user is ACTUALLY idle for their whole break
    breakCountFunc = setInterval(() => {
      this.setState({ breakCounter: this.state.breakCounter += 1 })
      if (Math.abs(this.state.breakCounter - this.props.idleTime) > 2.5 && this.state.breakCounter < this.props.breakInterval * 60000) {
        alert(`Looks like you came back early. Remember that ${this.props.avatar.name} can't stay healthy if you don't!`)
        //this line docks you a point if you come back early. 
        let updatedAvatar = Object.assign({}, this.props.avatar, { health: this.props.avatar.health - 1 })
        this.props.setStoreHealth(updatedAvatar)
        this.handleClickWork()
      }
    }, 1000)
  }


  changeFullScreen() {
    let win = window.require('electron').remote.getCurrentWindow()
    win.isFullScreen() === false ? win.setFullScreen(true) : win.setFullScreen(false)
  }

  handleClickBreak() {
    this.changeFullScreen()
    clearTimeout(timerFunc)
    clearInterval(healthFunc)
    //this tells the render to show the sleeping donke
    this.props.setStoreStatus('break')
    this.breakTimer()
  }

  handleClickWork() {
    this.changeFullScreen()
    //clear all running timers
    clearInterval(breakCountFunc)
    clearInterval(healthFunc);
    clearTimeout(timerFunc)
    //reset break counter for next time
    //set breakTimeOver to false so renders "Take a break" button
    this.setState({ workTime: true, breakCounter: 0, breakTimeOver: false });
    //set store status to inform renders/animations
    this.props.setStoreStatus('working')
    this.workTimer()
  }

  handleClickTryAgain() {
    //this is if the donke died... sad.
    this.props.deleteAvatar(this.props.avatar.id)
  }

  render() {
    return (
      this.props.workInterval > 0
        //if the user has submitted their work/break intervals render the below
        ? this.props.status !== 'break'
          //render the below if they are not on a break
          ? <div>
            {this.props.avatar.health > 0
              //render "Take a break" button if they have health or "Try again" button if they don't
              ? <button className="donkeBtn" onClick={this.handleClickBreak}>Take a break!</button>
              : <button className="donkeBtn" onClick={this.handleClickTryAgain}>Try Again</button>}
            <Donke />
            {this.props.avatar.health === 10
              ? this.props.status === 'needBreak'
                //this ternery checks if the user needs a break or is coming back from a break and renders accordingly
                ? <div> <Sun /> <Grass /> <PartyHat /> <SpeechBubble text={"Time for a break!"} /></div>
                : <div> <Sun /> <Grass /> <PartyHat /> </div>
              : null}
            {this.props.avatar.health === 9
              ? this.props.status === 'needBreak'
                ? this.state.needBreakMessage
                  //this ternery renders 'time for a break' speech bubble if the work time runs out while they are on this health level
                  ? <div> <Sun /> <Grass /> <SpeechBubble text={"Time for a break!"} /></div>
                  : <div> <Sun /> <Grass /> <PartyHat /><SpeechBubble text={"No break?"} /></div>
                : <div> <Sun /> </div>
              : null}
            {this.props.avatar.health === 8
              ? this.state.needBreakMessage
                ? <div> <Sun /> <Cloud /> <SpeechBubble text={"Time for a break!"} /></div>
                : <div> <Sun /> <Cloud /> </div>
              : null}
            {this.props.avatar.health === 7
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <SpeechBubble text={"Time for a break!"} /> </div>
                : <div> <Cloud /> </div>
              : null}
            {this.props.avatar.health === 6
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <SpeechBubble text={"Time for a break!"} /> </div>
                : <div> <Cloud /> </div>
              : null}
            {this.props.avatar.health === 5
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <SpeechBubble text={"Time for a break!"} /> </div>
                : <div> <Cloud /> </div>
              : null}
            {this.props.avatar.health === 4
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <SpeechBubble text={"Time for a break!"} /> </div>
                : <div> <Cloud /> </div>
              : null}
            {this.props.avatar.health === 3
              ? this.props.status === 'needBreak'
                ? this.state.needBreakMessage
                  ? <div> <Cloud /> <Lightning /> <SpeechBubble text={"Time for a break!"} /></div>
                  : <div> <Cloud /> <Lightning /> <SpeechBubble text={"I'm so tired. Can we take a break now?"} /></div>
                : <div> <Cloud /> <Lightning /></div>
              : null}
            {this.props.avatar.health === 2
              ? this.state.needBreakMessage
                ? <div> <Cloud /> <Lightning /> <SpeechBubble text={"Time for a break!"} /> </div>
                : <div> <Cloud /> <Lightning /> </div>
              : null}
            {this.props.avatar.health === 1
              ? this.props.status === 'needBreak'
                ? this.state.needBreakMessage
                  ? <div> <Cloud /> <Lightning /><SpeechBubble text={"Time for a break!"} /></div>
                  : <div> <Cloud /> <Lightning /><SpeechBubble text={"I don't feel so well..."} /></div>
                : <div> <Cloud /> <Lightning /></div>
              : null}
            {this.props.avatar.health === 0 ? <div><Halo /><Cloud /><Lightning /></div> : null}
          </div>
          : this.state.breakTimeOver
            ? <div> <button className="donkeBtn" onClick={this.handleClickWork}>Work time!</button> <SleepingDonke /> </div>
            : <div><SleepingDonke /></div>
        //if the user has not submitted time specifications, just render donke component. edge case - if they died in a playpen, render donke + "try again" button
        : this.props.avatar.health > 0
          ? <div><Donke /></div>
          : <div><button className="donkeBtn" onClick={this.handleClickTryAgain}>Try Again</button><Donke /></div>
    )
  }
}


const mapStateToProps = state => {
  return {
    workInterval: state.workInterval,
    breakInterval: state.breakInterval,
    idleTime: state.idleTime,
    status: state.status,
    avatar: state.avatar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStoreStatus(status) {
      dispatch(fetchStatus(status))
    },
    setStoreHealth(updatedAvatar) {
      dispatch(updateAvatarFirebase(updatedAvatar))
    },
    getWorkInterval(workTime, breakTime) {
      dispatch(fetchWorkInterval(workTime))
      dispatch(fetchBreakInterval(breakTime))
    },
    deleteAvatar(avatarId){
      dispatch(deleteAvatarFirebase(avatarId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDonke)
