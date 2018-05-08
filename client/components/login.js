import React, {Component} from 'react'
const firebase = require("firebase")
const secrets = require('../../secrets.js')
require("firebase/firestore")

firebase.initializeApp({
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  databaseURL: secrets.DATABASE_URL,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID
});

let db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);


export default class Login extends Component {
  constructor(props){
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
    this.setState({ [event.target.name] : event.target.value })
  }

  handleSignIn(event, email, password) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        res.uid.length ? this.setState({ loggedIn : true }) : null
        })
      .catch(function(error) {
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

  handleCreateUser(event, email, password, displayName) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        // .then(user => {
        //   admin.auth().updateUser(user.uid, {
        //     displayName
        //   })
        // })
        // .then(console.log)
        .catch(function(error) {
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


  render(){
    return(
      <div className="login">
      {
        this.state.loggedIn === false
        ?
        <div className="login-container">
        <div>
          <label>Login</label>
        </div>
        <div className="email-password">
          {/* <div className="displayName">
            <div className="displayName-label">
              <label>Display Name</label>
            </div>
            <input name="displayName" type="string" onChange={this.handleChange} value={this.state.displayName}/>
          </div> */}
          <div className="email">
            <div className="email-label">
              <label>Email</label>
            </div>
            <input name="email" type="string" onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div className="password">
            <div className="password-label">
              <label>Password</label>
            </div>
            <input name="password" type="string" onChange={this.handleChange} value=  {this.state.password}/>
          </div>
        </div>
        <div className="signIn">
          <button onClick={(e) => this.handleSignIn(e, this.state.email, this.state.password)}>Sign In</button>
        </div>
        <div className="create-new-label">
          <label>New to Break Buddy?</label>
        </div>
        <div className="create-new-button">
          <button onClick={(e) => this.handleCreateUser(e, this.state.email, this.state.password, this.state.displayName)}>Create Your New Account</button>
        </div>
      </div>
      : null
      }
      </div>
    )
  }
}