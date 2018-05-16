import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PartyHat, Cloud, Sun, Grass, Halo, SpeechBubble, Lightning, SleepingDonke, Toys } from './index';
import store, { setPlaypenStatus, fetchWorkInterval, fetchBreakInterval, fetchStatus, deleteAvatarFirebase, updateAvatarFirebase, getPlaypenFirebase, updatePlaypenFirebase, deletePlaypenFirebase } from '../store';
import { playAudio } from '../library/audio';
import { db } from '../app';
import * as firebase from 'firebase';
import { dragDonke } from '../library/animations';
import { blop } from '../library/audio';



// var currentuser = firebase.auth().currentUser;

//delete playpen once everyone leaves

let timerFunc;
let healthFunc;
let breakCountFunc;

export class Playpen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      avatarsInPlaypen: [this.props.avatar],
      subscriptions: [],
      start: true,
      breakCounter: 0,
      breakTimeOver: false,
      needBreakMessage: false
    };
    this.leavePlaypen = this.leavePlaypen.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.handleClickWork = this.handleClickWork.bind(this)
    this.handleClickBreak = this.handleClickBreak.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
    this.needBreak = this.needBreak.bind(this)
  }

  componentDidMount() {
    let playpen = this.props.playpen
    this.props.getWorkInterval(playpen.workInterval, playpen.breakInterval)
    playpen.avatars.map((avatar) => {
      //subscribe to a snapshot for every avatar in the playpen that is not yourself so you can get updates on their health
      if (avatar.id !== this.props.avatar.id) {
        let unsubscribe = db.collection('avatars').doc(`${avatar.id}`).onSnapshot(this.onUpdate)
        this.setState({ subscriptions: [[`${avatar.id}`, unsubscribe], ...this.state.subscriptions] })
      }
    })
  }

  componentWillUnmount() {
    //This ensures that we have unsubscribed the listeners for all of the playpen avatars that don't belong to the user
    this.state.subscriptions.map((subscription) => {
      subscription[1]()
    })
    clearInterval(healthFunc);
    clearTimeout(timerFunc);
    this.props.getWorkInterval(0, 0)
    this.props.setStoreStatus('working')
    if (this.state.avatarsInPlaypen.length < 2){
      this.props.deletePlaypenStore(this.props.playpen.id)
    }
  }

  changeFullScreen() {
    let win = window.require('electron').remote.getCurrentWindow()
    win.isFullScreen() === false ? win.setFullScreen(true) : win.setFullScreen(false)
  }

  componentDidUpdate(prevProps) {
    if (this.props.workInterval > 0 && this.state.start) {
      this.workTimer()
    }
  }

  leavePlaypen() {
    blop()
    this.props.setPlaypen(false)
    //reset the users playpen id to null to re-render their individual view
    db
      .collection('avatars')
      .doc(`${this.props.avatar.id}`)
      .update({ playpenId: null })
      .catch(error =>
        console.log(`Unable to reset playpen id ${error.message}`)
      );
  }

  onUpdate(avatarSnapshot) {
    let avatar = avatarSnapshot.data()
    avatar.id = avatarSnapshot.id
    //if statement to filter out avatars who have left
    if (avatar.playpenId !== this.props.playpen.id) {
      let newPlaypenPopulation = this.state.avatarsInPlaypen.filter((selectedAvatar) => selectedAvatar.userId !== avatar.userId)
      this.setState({ avatarsInPlaypen: newPlaypenPopulation})
      // this.setState({ subscriptions: 
      //   this.state.subscriptions.filter((subscription) => {subscription[0] !== avatar.id })
      // })
    }
    //only add the avatars if invited = false, because that means they have accepted
    else if (!avatar.invited) {
      let add = true;
      this.state.avatarsInPlaypen.map((mappedAvatar, idx) => {
        //if the avatar from snapshot is already in the playpen, update them in the playpen
        if (avatar.id === mappedAvatar.id) {
          add = false;
          let newArr = this.state.avatarsInPlaypen.slice();
          newArr[idx] = avatar;
          this.setState({ avatarsInPlaypen: newArr });
          return;
        }
      })
      add ? this.setState({avatarsInPlaypen: [avatar, ...this.state.avatarsInPlaypen]}) : null
    } 
  }

  workTimer() {
    this.setState({ start: false })
    const workInterval = this.props.workInterval * 60000
    //in seconds for testing
    //const workInterval = this.props.workInterval * 1000
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
    }, 8000)
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
    }, 
    this.props.breakInterval * 60000);
    //in seconds for testing
    //this.props.breakInterval * 1000);
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

  handleClickBreak() {
    blop()
    this.changeFullScreen()
    clearTimeout(timerFunc)
    clearInterval(healthFunc)
    //this tells the render to show the sleeping donke
    this.props.setStoreStatus('break')
    this.breakTimer()
  }

  handleClickWork() {
    blop()
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


  render() {
    const avatarsArr = this.props.playpen.avatars
    return (
      <div className="pen-container">
        {
          avatarsArr && avatarsArr.length &&
            this.props.workInterval > 0
            ? this.props.status !== 'break'
              //render the below if they are not on a break
              ?
              <div>
                <div className="pen-welcome">
                  <div id="pen-name">Playpen {this.state.playpen.name}</div>
                </div>
                <div className='playpenComponent'>
                  <div className="pen-friends">
                    {this.state.avatarsInPlaypen.map(avatarFriend => {
                      if (avatarFriend.userId !== this.props.avatar.userId) {
                        return (
                          <div className="playpen-friends" key={avatarFriend.id}>
                            <div>
                              <img src={`../img/donke${avatarFriend.health}.svg`} onClick={() => playAudio('happy')} />
                            </div>
                            <div><p>{avatarFriend.name}</p></div>
                          </div>
                        )
                      }
                    })
                    }
                  </div>
                  <div className="playpen-friends">
                    <div>
                      <img src={`../img/donke${this.props.avatar.health}.svg`} onClick={() => playAudio('happy')} />
                    </div>
                    <div className="avatar-name"><p>{this.props.avatar.name}</p></div>
                  </div>
                </div>
                <Grass />
                <PartyHat />
                <Toys />
                <button className="donkeBtn-leave" onClick={this.leavePlaypen}>
                  Leave Playpen
          </button>
                {
                  //render "Take a break" button if they have health or "Try again" button if they don't
                  this.props.avatar.health > 0
                    ?
                    <div><button className="donkeBtn" onClick={this.handleClickBreak}>Take a Break!</button></div>
                    : null
                }
              </div>
              : this.state.breakTimeOver
                ? <div> <button className="donkeBtn" onClick={this.handleClickWork}>Work Time!</button> <SleepingDonke /> </div>
                : <div><SleepingDonke /></div>
            : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    workInterval: state.workInterval,
    breakInterval: state.breakInterval,
    idleTime: state.idleTime,
    status: state.status,
    avatar: state.avatar,
    playpen: state.playpen    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaypen(bool) {
      dispatch(setPlaypenStatus(bool))
    },
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
    deletePlaypenStore(playpenId){
      dispatch(deletePlaypenFirebase(playpenId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playpen)
