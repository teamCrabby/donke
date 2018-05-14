import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { db, auth, authAdmin } from '../app'
import { setPlaypenStatus } from '../store'

class PlaypenForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onToggle: this.props.disabled,
      playPenName: '',
      invitedUser: '',
      users: [],
      owner: '',
      avatars: [this.props.avatar]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddABuddy = this.handleAddABuddy.bind(this)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  componentDidMount() {
    console.log('THIS IS THE DISABLED PROPS', this.props.disabled)
    let user = firebase.auth().currentUser
    if (user !== null) {
      db.collection('users').doc(user.uid).get()
        .then(res => {
          let userinFS = res.data()
          // console.log('USER FROM FIRESTORE', userinFS)
          this.setState({ owner: { name: userinFS.handle, email: user.email, uid: user.uid } })
        })
    }
  }

  handleSubmit(event) {
    let avatars = this.state.avatars
    db.collection('playPen').add({
      name: this.state.playPenName,
      users: [...this.state.users, this.state.owner.name],
      owner: this.state.owner.name,
      avatars: this.state.avatars
    })
      .then((res) => {
        // console.log('RES OF CREATING PLAYPEN', res)
        return db.collection('playPen').doc(res.id).get()
          .then((res) => {
            let playpen
            playpen = res.data()
            playpen.id = res.id
            // console.log('GOT PLAYPEN', playpen)
            return playpen
          })
      })
      .then(pen => {
        console.log('PLAYPEN RETURNED', pen)
        let bool = true
        console.log('THIS.STATE.AVATARS INSIDE HANDLESUBMIT', this.state.avatars)
        return this.state.avatars.map(avatar => {
          //this is to make sure the owner doesn't get an invitation to their own playpen
          if (this.props.user === avatar.userId) {
            bool = false
          } else {
            bool = true
          }
          db.collection('avatars').doc(avatar.id).update({
            invited: bool,
            playpenId: pen.id
          }).then((res) => {
            return
          })
        })
      })
      .then((res) => {
        console.log('WHATEVER IS RETURNED FROM MAPPING OVER AVATARS AND UPDATING THEM', res)
        this.props.setPlaypen(true)
        console.log('Document successfully written, HOORAY')
        console.log("OWNER'S PLAYPEN STATUS AFTER UPDATING ALL THE AVATARS", this.props.playpenStatus)
      })
      .catch((error) => console.log(`Unable to save playpen ${error.message}`))
    this.setState({ onToggle: false, invitedUser: '', users: [] })
  }

  handleAddABuddy(event) {
    event.preventDefault()
    if (this.state.users.indexOf(this.state.invitedUser) === -1) {
      return db.collection('users').where('handle', '==', this.state.invitedUser)
        .get()
        .then(function (querySnapshot) {
          console.log('query snap', querySnapshot)
          let foundUser;
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, '==>', doc.data())
            if (doc) {
              foundUser = doc.data()
              foundUser.id = doc.id
              console.log('FOUND USER:', foundUser)
            } else {
              alert(`Sorry, that user does not exist.`)
            }
          })
          return foundUser;
        })
        .then((user) => {
          // console.log('USER', user)
          return db.collection('avatars').where('userId', '==', user.id)
            .get()
            .then(function (querySnapshot) {
              let foundAvatar;
              querySnapshot.forEach(function (doc) {
                // console.log(doc.id, '==>', doc.data())
                if (doc) {
                  foundAvatar = doc.data()
                  foundAvatar.id = doc.id
                  // console.log('FOUND AVATAR:', foundAvatar)
                } else {
                  alert(`Sorry, that avatar does not exist.`)
                }
              })
              // console.log('FOUND AVATAR OUTSIDE FOR EACH', foundAvatar)
              return foundAvatar;
            })
        })
        .then(avatar => {
          //update avatar here with invited and playpen id : db.collection('avatar').doc(avatar.id).update
          // db.collection('avatar').doc(avatar.id).update({
          // })
          // console.log('AVATAR', avatar)
          this.setState({
            invitedUser: '',
            users: [this.state.invitedUser, ...this.state.users],
            avatars: [avatar, ...this.state.avatars]
          })
          // console.log('users array is...', this.state.users)
          // console.log('avatars array is ...', this.state.avatars)
        })
    } else {
      alert(`User ${this.state.invitedUser} already added`)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log('the users on the local state', this.state.users)
  }

  handleRemoveUser(event, index) {
    let updatedUsers = this.state.users.filter((user, idx) => {
      return idx !== index
    })
    this.setState({ users: updatedUsers, avatars: this.state.avatars.slice(1) })
  }

  render() {
    let {status} = this.props
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
                                  <div onClick={(e) => this.handleRemoveUser(e, idx)}>{` ${user}`}</div>
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
<<<<<<< HEAD
    playpenStatus: state.playpenStatus
=======
    status: state.status
>>>>>>> master
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaypen(bool) {
      dispatch(setPlaypenStatus(bool))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaypenForm)