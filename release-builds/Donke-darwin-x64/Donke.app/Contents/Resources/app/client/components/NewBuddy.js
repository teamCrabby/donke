import React, { Component } from 'react'
import { connect } from 'react-redux'
import {db, auth} from '../app'
import store, { createAvatarFirebase } from '../store'


export class NewBuddy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInLocal: false,
      buddyName: ''
    }
    this.handleNameBuddy = this.handleNameBuddy.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNameBuddy(event) {
    event.preventDefault
    this.props.createAvatarStore({
      name: this.state.buddyName,
      userId: auth.currentUser.uid,
      health: 10,
      playpenId: null,
      invited: false
    })
  }


  render() {
    return (
      <div className="login">
        {
          <div className="login-container">
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
    loggedIn: state.loggedIn,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAvatarStore(avatar) {
      dispatch(createAvatarFirebase(avatar))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewBuddy)





