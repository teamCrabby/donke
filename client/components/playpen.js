import React, { Component } from 'react';
import { db } from '../app'


export default class Playpen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playPenName: '',
      invitedUser: '',
      users: ['trice']
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddABuddy = this.handleAddABuddy.bind(this)
  }


  handleSubmit(event, db, playPenName, users) {
    //event.preventDefault()
    db.collection('playPen').doc().set({
      name: playPenName,
      users: users
    })
      .then((res) => console.log('Document successfully written, HOORAY'))
      .catch((error) => console.log(`Unable to save playpen ${error.message}`))
  }


  handleAddABuddy(event, invitedUser, usersArr) {
    event.preventDefault()
    this.setState({
      users: [invitedUser, ...usersArr]

    })
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    console.log(this.state)
    return (
      <div className="formContainer">
        <div className="playPen">
          <div>
            <label>Pick a name for your playpen: </label>
            <div>
              <input name='playPenName' type="text" value={this.state.playPenName} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="pickFriend">

          <label>Who do you want to invite over?</label>
          <select name="invitedUser" onChange={this.handleChange}>
            {
              ['boddy', 'suzie', 'trashcan', 'poopsie', 'puberty'].map((name, idx) => {
                return (<option key={idx}>{name}</option>)
              })
            }
          </select>
          <div>
            <button onClick={(event) => this.handleAddABuddy(event, this.state.invitedUser, this.state.users)}>Add a Buddy</button>
          </div>
          <div>
            <button onClick={(event) => this.handleSubmit(event, db, this.state.playPenName, this.state.users)}>Submit</button>
          </div>

        </div>
      </div>
    )
  }
}
