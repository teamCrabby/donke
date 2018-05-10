import React, { Component } from 'react'
import { db } from '../app'
export default class Playpen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playpenName: '',
      users: [],
      user: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleCreatePlaypen = this.handleCreatePlaypen.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCreatePlaypen(e, fb, playpenName, users) {
    // fb.collection('playPen').doc('buenas playpen').set({
    fb.collection('playPen').doc().set({
      name: 'playpen placeholder',
      users: ['z', 'g', 'x']
    })
      .then(console.log)
      .catch((error) => console.error(`Unable to save playpen ${error.message}`))
  }

  handleSignIn(event, email, password) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        res.uid.length ? this.setState({ loggedIn: true }) : null
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(`Unable to log in, ${errorCode} : ${errorMessage}`)
        if (error) {
          alert(`Uh oh! ${errorMessage} Please try again`)
        }
        // ...

      });


  }

  render() {
    return (
      <div className="login">
        <div className="login-container">
          <div>
            <label>Login</label>
          </div>
          <div className="email-password">
            <div className="email">
              <div className="email-label">
                <label>Email</label>
              </div>
              <input name="playpenName" type="string" onChange={this.handleChange} value={this.state.playpenName} />
            </div>
            <div className="password">
              <div className="password-label">
                <label>Password</label>
              </div>
              <input name="user" type="string" onChange={this.handleChange} value={this.state.user} />
            </div>
          </div>
          <div className="signIn-and-signUp">
            <div className="signIn">
              <button onClick={(e) => this.handleSignIn(e, this.state.email, this.state.password)}>Sign In</button>
            </div>
            <div className="signUp">
              <button onClick={(e) => this.handleCreatePlaypen(e, db, this.state.playpenName, this.state.users)}>Create Playpen</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}