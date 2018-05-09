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
    event.preventDefault()
    db.collection('playPen').add({
      name: playPenName,
      users: ['a', 'b', 'c']
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(`Unable to save playpen ${error.message}`))
  }


  handleAddABuddy(event, invitedUser, usersArr) {
    console.log(invitedUser)
    console.log('SPREADSS', usersArr)
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
          <form onSubmit={(event) => this.handleSubmit(event, db, this.state.playPenName, this.state.users)}>
            <label>Pick a name for your playpen: </label>
            <div>
              <input name='playPenName' type="text" value={this.state.playPenName} onChange={this.handleChange} />
            </div>
          </form>
        </div>
        <div className="pickFriend">
          <form onSubmit={this.handleSubmit}>
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
