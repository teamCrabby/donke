import React, { Component } from 'react'
import { connect } from 'react-redux'
import {db, auth} from '../app'
import store, { setLoggedIn } from '../store'


export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInLocal: false,
      email: '',
      password: '',
      displayName: '',
      buddyName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleNameBuddy = this.handleNameBuddy.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  handleSignIn(event) {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        res.uid.length ? this.setState({ loggedInLocal: true }) : null
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
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        user.updateProfile({
          displayName: this.state.displayName
        })
        user.uid.length ? this.setState({ loggedInLocal: true }) : null
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

  handleNameBuddy(event) {
    event.preventDefault
    db.collection("avatars").doc().set({
      name: this.state.buddyName,
      userId: auth.currentUser.uid
    })
    .then(res =>  {
        console.log("Document successfully written!");
        this.props.setStoreLoggedIn(true)
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }


  render() {
    return (
      <div className="login">
        {
          this.state.loggedInLocal === false
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
              <div className="login-button">
                <div className="signIn">
                  <button onClick={this.handleSignIn}>Sign In</button>
                </div>
                <div className="signUp">
                  <button onClick={this.handleCreateUser}>Sign Up</button>
                </div>
              </div>
            </div>
            : <div className="login-container">
                <div>
                  <label>Name Your Buddy</label>
                </div>
                <div className="email-password">
                  <div className="buddyName">
                    <div className="buddyName-label">
                      <label>Name</label>
                    </div>
                    <input name="buddyName" type="string" onChange={this.handleChange} value={this.state.buddyName}/>
                  </div> 
                </div>
              <div className="login-button">
                <div className="submit-buddy">
                  <button onClick={this.handleNameBuddy}>Let's Go!</button>
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStoreLoggedIn(loggedInBool) {
      dispatch(setLoggedIn(loggedInBool))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)





