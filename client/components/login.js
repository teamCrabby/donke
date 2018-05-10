import React, { Component } from 'react'
const firebase = require("firebase")



export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      email: '',
      password: '',
      displayName: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  handleSignIn(event) {
    event.preventDefault()
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
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
      });


  }

  handleCreateUser(event) {
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        user.updateProfile({
                displayName: this.state.displayName
            })
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(`Unable to create Email, ${errorCode} : ${errorMessage}`)
        if (error) {
          alert(`Uh oh! ${errorMessage} Please try again`)
        }
        // ...
      });

  }


  render() {
    return (
      <div className="login">
        {
          this.state.loggedIn === false
            ?
            <div className="login-container">
              <div>
                <label>Login</label>
              </div>
              <div className="email-password">
                <div className="displayName">
                  <div className="displayName-label">
                    <label>Display Name</label>
                  </div>
                  <input name="displayName" type="string" onChange={this.handleChange} value={this.state.displayName}/>
                </div> 
                <div className="email">
                  <div className="email-label">
                    <label>Email</label>
                  </div>
                  <input name="email" type="string" onChange={this.handleChange} value={this.state.email} />
                </div>
                <div className="password">
                  <div className="password-label">
                    <label>Password</label>
                  </div>
                  <input name="password" type="string" onChange={this.handleChange} value={this.state.password} />
                </div>
              </div>
              <div className="signIn-and-signUp">
                <div className="signIn">
                  <button onClick={this.handleSignIn}>Sign In</button>
                </div>
                <div className="signUp">
                  <button onClick={this.handleCreateUser}>Sign Up</button>
                </div>
              </div>
            </div>
            : null
        }
      </div>
    )
  }
}