import React, { Component } from 'react';
import * as firebase from 'firebase'
import {db} from '../app'

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

  componentDidMount(){
    let user = firebase.auth().currentUser
    if (user !== null) {
      this.setState({ owner : { name: user.displayName, email: user.email, uid: user.uid } })
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
    this.setState({onToggle: false, invitedUser: '', users: []})
  }

  handleAddABuddy(event) {
    this.setState({
      invitedUser: '',
      users: [this.state.invitedUser, ...this.state.users]
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRemoveUser(event, index){
    let updatedUsers = this.state.users.filter((user, idx) => {
      return idx !== index
    })
    this.setState({ users : updatedUsers })
  }

  render() {
    console.log(this.state)
    return (
        <div className="navbar-wrapper">
          {
           this.state.onToggle === true
           ?
          <div className="navbar-container">
            <div>
              <label className="navbar-name">Playpen Name</label>
            </div>
            <div className="navbar-options">
              <input name='playPenName' placeholder="Insert Name" type="text" value={this.state.playPenName} onChange={this.handleChange} />
            </div>

            <div className="navbar-container">
              <label className="navbar-name">Find a Friend</label>
              {/* <select name="invitedUser" onChange={this.handleChange}>
              {
                ['boddy', 'suzie', 'trashcan', 'poopsie', 'puberty'].map((name, idx) => {
                  return (<option key={idx}>{name}</option>)
                })
              }
            </select> */}
              <div>
              {
              this.state.users.length
              ?
              this.state.users.map((user, idx) => {
                return (
                  <div className="playPen-invitedUser" key={idx}>
                    <div onClick={(e) => this.handleRemoveUser(e, idx)}>{`- ${user}`}</div>
                  </div>
                )
              })
              : null
              }
                <input name="invitedUser" placeholder="Insert friend" onChange={this.handleChange} value={this.state.invitedUser} />
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

    )
  }
}
