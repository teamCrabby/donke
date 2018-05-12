import React, { Component } from 'react'
import { connect } from 'react-redux'
import { annoyed } from '../library/audio'
import path from 'path'
import { HealthBar, PlaypenForm, IntervalForm } from './index'
import * as firebase from 'firebase'
import { setLoggedIn, fetchWorkInterval, fetchBreakInterval, setStart, updateAvatar } from '../store';
import { db } from '../app'


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: false,

    }
    this.handleWorkBreakForm = this.handleWorkBreakForm.bind(this)
    this.handlePlayPenForm = this.handlePlayPenForm.bind(this)
    this.handleCloseForms = this.handleCloseForms.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = db.collection('avatars').doc(`${this.props.avatar.id}`).onSnapshot(this.onUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onUpdate(updatedAvatar) {
    console.log('SNAPSHOT', updatedAvatar.data())
    this.props.updateAvatarStore(updatedAvatar.data())
  };

  handleCloseForms(event) {
    this.setState({
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: false,
    })
  }

  handleWorkBreakForm(event) {
    this.setState({
      playPenFormClicked: false,
      logOutClicked: false,
      workBreakClicked: !this.state.workBreakClicked
    })
  }

  handlePlayPenForm(event) {
    this.setState({
      logOutClicked: false,
      workBreakClicked: false,
      playPenFormClicked: !this.state.playPenFormClicked
    })
  }

  handleLogOut(event) {
    this.props.setStoreLoggedIn(false)
    firebase.auth().signOut()
      .then(function () {
        console.log(`Sign-out successful.`)
        //alert(`Bye!`)
      })
      .catch(function (error) {
        if (error) {
          alert(`Uh oh! Unable to log out. ${error.message} Try again`)
        }
      })

    this.setState({
      workBreakClicked: false,
      playPenFormClicked: false,
      logOutClicked: !this.state.logOutClicked
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-options">

          <img className="Img" id="gearIcon" src="../img/close.svg" onClick={this.handleCloseForms} />
          <img className="Img" src="../img/hourglass-2.svg" onClick={this.handleWorkBreakForm} />
          <img className="Img" src="../img/diamond.svg" onClick={this.handlePlayPenForm} />
          <img className="Img" src="../img/locked-1.svg" onClick={this.handleLogOut} />
          <div className="health">
            <HealthBar />
          </div>
        </div>
        {
          this.state.workBreakClicked === true
            ?
            <IntervalForm disabled={this.state.workBreakClicked} />
            : null
        }
        {
          this.state.playPenFormClicked === true
            ?
            <div className="navbar-container">
              <PlaypenForm />
              <PlaypenForm disabled={this.state.playPenFormClicked} />
            </div>
            :
            null
        }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStoreLoggedIn(loggedInBool) {
      dispatch(setLoggedIn(loggedInBool))
    },
    getWorkInterval(workTime, breakTime) {
      dispatch(fetchWorkInterval(workTime))
      dispatch(fetchBreakInterval(breakTime))
    },
    setStartTimer(bool) {
      dispatch(setStart(bool))
    },
    updateAvatarStore(updatedAvatar) {
      dispatch(updateAvatar(updatedAvatar));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

