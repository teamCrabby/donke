import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { db, auth, authAdmin } from '../app'
import { setPlaypenStatus, setPlaypen, updateAvatar, updateAvatarFirebase, addPlaypenFirebase } from '../store'

class PlaypenForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onToggle: this.props.disabled,
      playPenName: '',
      invitedUser: '',
      users: [],
      owner: {},
      avatars: [],
      workInterval: 0,
      breakInterval: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddABuddy = this.handleAddABuddy.bind(this)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  componentDidMount() {
    let user = firebase.auth().currentUser
    if (user !== null) {
      db.collection('users').doc(user.uid).get()
        .then(res => {
          let userinFS = res.data()
          this.setState({ owner: { name: userinFS.handle, email: user.email, uid: user.uid } })
        })
    }
  }

  handleSubmit(event) {
    //add the playpen to the store and firestore
    this.props.addPlaypenStore({
      name: this.state.playPenName,
      users: [...this.state.users, this.state.owner.name],
      owner: this.state.owner,
      avatars: [...this.state.avatars, this.props.avatar],
      workInterval: this.state.workInterval,
      breakInterval: this.state.breakInterval
    })
    this.props.setPlaypenStatusStore(true)
    this.setState({ onToggle: false, invitedUser: '', users: [] })
  }

  handleAddABuddy(event) {
    event.preventDefault()
    if (this.state.users.indexOf(this.state.invitedUser) === -1) {
      return db.collection('users').where('handle', '==', this.state.invitedUser)
        .get()
        .then(function (querySnapshot) {
          let foundUser;
          if (querySnapshot.docs.length) {
            querySnapshot.forEach(function (doc) {
              foundUser = doc.data()
              foundUser.id = doc.id
            })
          } else {
            alert(`Unable to find your buddy`)
          }
          return foundUser
        })
        .then((user) => {
          return db.collection('avatars').where('userId', '==', user.id)
            .get()
            .then(function (querySnapshot) {
              let foundAvatar;
              if (querySnapshot.docs.length) {
                querySnapshot.forEach(function (doc) {
                  foundAvatar = doc.data()
                  foundAvatar.id = doc.id
                })
              } else {
                alert(`Sorry, that user does not have an avatar.`)
              }
              return foundAvatar;
            })
        })
        .then(avatar => {
          //update avatar here with invited and playpen id : db.collection('avatar').doc(avatar.id).update
          // db.collection('avatar').doc(avatar.id).update({
          // })
          this.setState({
            invitedUser: '',
            users: [this.state.invitedUser, ...this.state.users],
            avatars: [avatar, ...this.state.avatars]
          })
        })
        .catch(error => {
          console.error(`Sorry, cannot find your friend ${error.message}`)
        })
    } else {
      alert(`User ${this.state.invitedUser} already added`)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRemoveUser(event, index) {
    let updatedUsers = this.state.users.filter((user, idx) => {
      return idx !== index
    })
    let updatedAvatars = this.state.avatars.filter((avatar, idx) => {
      return idx !== index
    })
    this.setState({ users: updatedUsers, avatars: updatedAvatars })
  }

  render() {
    let { status } = this.props
    return (
      (this.state.onToggle === true && status !== 'break')
        ?
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <div>
              <label className="navbar-name">Playpen Name</label>
            </div>
            <div className="navbar-name">
              <input name='playPenName' placeholder="Insert Name" type="text" value={this.state.playPenName} onChange={this.handleChange} />
            </div>
            <div className="navbar-container">
              <label className="navbar-name">Play date with</label>
              <div className="navbar-name">
                <div className="playpenFriends">
                  <input name="invitedUser" placeholder="Insert friend" onChange={this.handleChange} value={this.state.invitedUser} />
                  <div className="friends">
                    {
                      this.state.users.length
                        ?
                        this.state.users.map((user, idx) => {
                          return (
                            <div className="playPen-invitedUser" key={idx}>
                              <div onClick={(e) => this.handleRemoveUser(e, idx)}>{`x ${user}`}</div>
                            </div>
                          )
                        })
                        : null
                    }
                  </div>
                </div>
              </div>
              <div>
                <button onClick={this.handleAddABuddy}>ADD A BUDDY</button>
              </div>
              <div className="navbar-container-form">
                <div className="navbar-name">Set Work Interval</div>
                <div className="navbar-select">
                  <select name="workInterval" onChange={this.handleChange}>
                    {
                      [0, 1, 3, 10, 20, 30, 40].map((interval, idx) => {
                        return (
                          <option key={idx}>{interval}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="navbar-container-form">
                <div className="navbar-name">Set Break Interval</div>
                <div className="navbar-select">
                  <select name="breakInterval" onChange={this.handleChange}>
                    {
                      [0, 1, 5, 10, 20, 30].map((interval, idx) => {
                        return (
                          <option key={idx}>{interval}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div>
                <button onClick={this.handleSubmit}>SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
        : null
    )
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar,
    user: state.user,
    status: state.status,
    playpen: state.playpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaypenStatusStore(bool) {
      dispatch(setPlaypenStatus(bool))
    },
    setPlaypenStore(playpen){
      dispatch(setPlaypen(playpen))
    },
    updateAvatarStore(chagedAvatar){
      dispatch(updateAvatarFirebase(changedAvatar))
    },
    addPlaypenStore(playpen){
      dispatch(addPlaypenFirebase(playpen))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaypenForm)