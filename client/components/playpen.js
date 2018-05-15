import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PartyHat, Cloud, Sun, Grass, Halo, SpeechBubble, Lightning, SleepingDonke, Toys } from './index';
import store, { setPlaypenStatus, fetchWorkInterval, fetchBreakInterval, fetchStatus, deleteAvatarFirebase, 
  //setStart, 
  updateAvatarFirebase } from '../store';
import { playAudio } from '../library/audio';
import { db } from '../app';
import * as firebase from 'firebase';
import { dragDonke } from '../library/animations';



// var currentuser = firebase.auth().currentUser;

//delete playpen once everyone leaves

let timerFunc;
let healthFunc;
let breakCountFunc;

export class Playpen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      playpen: {},
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
    // this.handleClickTryAgain = this.handleClickTryAgain.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
    this.needBreak = this.needBreak.bind(this)
  }

  componentDidMount() {
      dragDonke();
      db
        .collection('playPen')
        .doc(`${this.props.avatar.playpenId}`)
        .get()
        .then(res => {
          let playpen = res.data();
          playpen.id = res.id;
          this.setState({ playpen });
          this.props.getWorkInterval(playpen.workInterval, playpen.breakInterval)
        })
        .then(() => {
          console.log("avatars in playpen is...", this.state.playpen.avatars)
          this.state.playpen.avatars.map((avatar) => {
            //subscribe to a snapshot for every avatar in the playpen that is not yourself so you can get updates on their health
            if (avatar.id !== this.props.avatar.id){
              let unsubscribe = db.collection('avatars').doc(`${avatar.id}`).onSnapshot(this.onUpdate)
              this.setState({subscriptions: [[`${avatar.id}`, unsubscribe], ...this.state.subscriptions]})
            }
          })
        })
        .catch(error =>
          console.log(`Unable to get playpen ${error.message}`)
        )
  }

  componentWillUnmount(){
    //This ensures that we have unsubscribed the listeners for all of the playpen avatars that don't belong to the user
    this.state.subscriptions.map((subscription) => {
      subscription[1]()
    })
    clearInterval(healthFunc);
    clearTimeout(timerFunc);
    this.props.getWorkInterval(0, 0)
    //this.props.setStartTimer(true)
    this.props.setStoreStatus('working')
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
    console.log('snapshot of updated avatar', avatarSnapshot.data())
    let avatar = avatarSnapshot.data()
    avatar.id = avatarSnapshot.id
    //if statement to filter out avatars who have left from the avatarsInPlaypen
    if (avatar.playpenId !== this.state.playpen.id) {
      let newPlaypenPopulation = this.state.avatarsInPlaypen.filter((selectedAvatar) => selectedAvatar.userId !== avatar.userId)
      this.setState({ avatarsInPlaypen: newPlaypenPopulation}, () => console.log('avatars after someone leaves', this.state.avatarsInPlaypen))
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
          newArr[idx]= avatar;
          this.setState({avatarsInPlaypen: newArr});       
          return;
        }
      })
      add ? this.setState({avatarsInPlaypen: [avatar, ...this.state.avatarsInPlaypen]}, () => console.log('playpen state', this.state.avatarsInPlaypen)) : null
    } 
  }

    //if the owner leaves the playpen, set all the avatars playpen ids to null and then destroy the playpen
  //  if (this.state.playpen.owner === this.props.avatar.userId) {
  //    this.state.playpen.avatars.forEach(avatar => {
  //      db
  //        .collection('avatars')
  //        .doc(`${avatar.id}`)
  //        .update({ playpenId: null })
  //        .then(() => {
  //          db
  //            .collection('playPen')
  //            .doc(`${this.state.playpen.id}`)
  //            .delete()
  //            .then(() => console.log('playpen deleted!'));
  //        })
  //        .catch(error =>
  //          console.log(
  //            `Unable to reset playpen id ${error.message}`
  //          )
  //        );
  //    });
    //}

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
    console.log('in workTimer timerfunc is', timerFunc)
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
    console.log('in needBreak healthFunc is', healthFunc)
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
      if (Math.abs(this.state.breakCounter - this.props.idleTime) > 3 && this.state.breakCounter < this.props.breakInterval) {
        alert("Looks like you came back early. Remember that your Creature can't stay healthy if you don't!")
        //this line docks you a point if you come back early. 
        let updatedAvatar = Object.assign({}, this.props.avatar, { health: this.props.avatar.health - 1 })
        console.log('THIS IS THE UPDATED AVATAR', updatedAvatar)
        this.props.setStoreHealth(updatedAvatar)
        this.handleClickWork()
      }
    }, 1000)
    console.log('in breakTimer healthFunc is', healthFunc)
    console.log('in breakTimer breakCountFunc is', breakCountFunc)
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

  
  render() {
    const avatarsArr = this.state.playpen.avatars
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
          {/* <PartyHat />
          <Toys /> */}
          <button className="donkeBtn-leave" onClick={this.leavePlaypen}>
              Leave Playpen
          </button>
          {
          //render "Take a break" button if they have health or "Try again" button if they don't
          this.props.avatar.health > 0
          ? 
          <div><button className="donkeBtn" onClick={this.handleClickBreak}>Take a break!</button></div>
          : null
          }
      </div>  
        : this.state.breakTimeOver
          ? <div> <button className="donkeBtn" onClick={this.handleClickWork}>Work time!</button> <SleepingDonke /> </div>
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
    avatar: state.avatar    
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
    // setStartTimer(bool) {
    //   dispatch(setStart(bool))
    // }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playpen)
