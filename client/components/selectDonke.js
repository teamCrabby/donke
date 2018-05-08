import React, { Component } from 'react';
import Donke from './donke';
import PartyHat from './partyHat';
import Cloud from './cloud';
import Sun from './sun';
import Grass from './grass';
import Halo from './halo';
import SpeechBubble from './speechBubble';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';
import store, { fetchHealth, fetchWorkInterval, fetchBreakInterval } from '../store';
import { sunLeave, sunFaceLeave } from '../library/animations';

let timerFunc;
let healthFunc;
let breakCountFunc;


//all donkey sounds are the same
//length of break doesn't really matter right now. is that ok?

export class SelectDonke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      workTime: true,
      breakCounter: 0,
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
      playAudio('http://izzyweird.com/soundlib1/donkey2.wav');
      this.needBreak()
    }, workInterval)
    //console logs
    // console.log('in worktimer setting timeout', timerFunc)
  }

  needBreak() {
    healthFunc = setInterval(() => {
      if (this.props.health > 0) {
        this.props.setStoreHealth(this.props.health - 1)
      }
    }, 3000)
    //console logs
    // console.log("in needBreak setting interval", healthFunc)
  }

  breakTimer() {
    healthFunc = setInterval(() => {
      if (this.props.health < 10) {
        this.props.setStoreHealth(this.props.health + 1)
      }
    }, this.props.breakInterval * 1000);
    breakCountFunc = setInterval(() => {
      this.setState({ breakCounter: this.state.breakCounter += 1 })
      console.log('BREAKCOUNTER', this.state.breakCounter)
      if (Math.abs(this.state.breakCounter - this.props.idleTime) > 5 && this.state.breakCounter < this.props.breakInterval) {
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
    this.setState({ workTime: false })
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
    this.setState({ workTime: true });
    this.setState({ breakCounter: 0 })
    this.workTimer()
  }

  handleClickTryAgain() {
    clearInterval(healthFunc)
    clearTimeout(timerFunc)
    this.setState({ workTime: true })
    this.props.setStoreHealth(10)
    this.props.getWorkInterval(0, 0)
  }

  sunOut() {
    sunLeave();
  }


  render() {
    return (
      this.props.workInterval > 0
        //if the user has submitted time specifications timer is running and render is dependent on timer
        ? <div>
          <div>
            <Donke />
<<<<<<< HEAD
            {this.props.health === 10 ? <div> <Sun /> <Grass /> <PartyHat /> </div> : null}
            {this.props.health === 9 ? <div> <Sun /> <Grass /> <PartyHat /> </div> : null}
            {this.props.health === 8 ? <div> <Grass /> <Cloud /> </div> : null}
            {this.props.health === 7 ? <div> <Grass /> <Cloud /> </div> : null}
            {this.props.health === 6 ? <div> <Grass /> <Cloud /> </div> : null}
            {this.props.health === 5 ? <div> <Grass /> <Cloud /> </div> : null}
            {this.props.health === 4 ? <div> <Cloud /> </div> : null}
            {this.props.health === 3 ? <div> <Cloud /> </div> : null}
            {this.props.health === 2 ? <div> <Cloud /> </div> : null}
            {this.props.health === 1 ? <div> <Cloud /> </div> : null}
            {this.props.health === 0 ? <Halo /> : null}
            {this.state.workTime
              ? <div>
                <button onClick={this.handleClickBreak}>Take a break!</button>
              </div>
              : <div>
                <button onClick={this.handleClickWork}>Work time!</button>
              </div>}
=======
            {
              this.props.health === 10 ?
                <div>
                  <Sun />
                  <Grass />
                  <PartyHat />
                </div> : null
            }
            {
              this.props.health === 1 ?
                <div>
                  <Cloud />
                </div> : null
            }
            {
              this.props.health === 0 ? <Halo /> : null
            }

            {this.props.health > 0
              ?
              this.state.workTime
                ? <div>
                  <button onClick={this.handleClickBreak}>Take a break!</button>
                </div>
                : <div>
                  <button onClick={this.handleClickWork}>Work time!</button>
                </div>
              :
              <button onClick={this.handleClickTryAgain}>Try Again</button>
            }


>>>>>>> 5f8a7e65043758180d439b267878facfde8f9439
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
    health: state.health,
    idleTime: state.idleTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
