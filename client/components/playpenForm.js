import React, { Component } from 'react';
import { db } from '../app'


export default class PlaypenForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playPenName: '',
      invitedUser: '',
      users: [],
      //need to add owner here
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddABuddy = this.handleAddABuddy.bind(this)
  }

  handleSubmit(event) {
    db.collection('playPen').doc().set({
      name: this.state.playPenName,
      users: this.state.users
    })
      .then((res) => console.log('Document successfully written, HOORAY'))
      .catch((error) => console.log(`Unable to save playpen ${error.message}`))
  }

  handleAddABuddy(event) {
    event.preventDefault()
    this.setState({
      users: [this.state.invitedUser, ...this.state.users]

    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    console.log(this.state)
    return (
      <div className="navbar-wrapper">
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
      </div>
    )
  }
}
