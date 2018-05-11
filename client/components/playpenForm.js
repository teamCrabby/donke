import React, { Component } from 'react';
import * as firebase from 'firebase'
import { db, auth, authAdmin } from '../app'

export default class PlaypenForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onToggle: this.props.disabled,
      playPenName: '',
      invitedUser: '',
      users: [],
      owner: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddABuddy = this.handleAddABuddy.bind(this)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  componentDidMount() {
    let user = firebase.auth().currentUser
    if (user !== null) {
      this.setState({ owner: { name: user.displayName, email: user.email, uid: user.uid } })
    }
  }

  handleSubmit(event) {
    db.collection('playPen').doc().set({
      name: this.state.playPenName,
      users: this.state.users,
      owner: this.state.owner.name
    })
      .then((res) => console.log('Document successfully written, HOORAY'))
      .catch((error) => console.log(`Unable to save playpen ${error.message}`))
    this.setState({ onToggle: false, invitedUser: '', users: [] })
  }

  handleAddABuddy(event) {
    event.preventDefault()
    let invitedUser = this.state.invitedUser
    //change this to query users collection
    authAdmin.listUsers()
      .then((userList) => {
        let [user] = userList.users.filter((user) => user.displayName === invitedUser)
        console.log('user is...', user)
        if (user) {
          this.setState({
            invitedUser: '',
            users: [invitedUser, ...this.state.users]
          })
          console.log('users array is...', this.state.users)
        }
        else alert("Can't find that user.")
        // console.log(user)
        // //will return the thing for which this is true, or [] if it's not true
        // console.log(userList.users)
      })

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRemoveUser(event, index) {
    let updatedUsers = this.state.users.filter((user, idx) => {
      return idx !== index
    })
    this.setState({ users: updatedUsers })
  }

  render() {
    return (
      <div className="navbarForm">
        <div className="navbar-wrapper">
          {
            this.state.onToggle === true
              ?
              <div className="navbar-wrapper">
                <div>
                  <label className="navbar-name">Playpen Name</label>
                </div>
                <div className="navbar-name">
                  <input name='playPenName' placeholder="Insert Name" type="text" value={this.state.playPenName} onChange={this.handleChange} />
                </div>

                <div className="navbar-container">
                  <label className="navbar-name">Play date with</label>
                  {/* <select name="invitedUser" onChange={this.handleChange}>
                {
                  ['boddy', 'suzie', 'trashcan', 'poopsie', 'puberty'].map((name, idx) => {
                    return (<option key={idx}>{name}</option>)
                  })
                }
              </select> */}

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

              : null
          }
        </div>
      </div>

    )
  }
}
