import React, { Component } from 'react'
import { playAudio } from '../library/audio'
import { connect } from 'react-redux'
import { db } from '../app'


class Donke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: ''
    }
  }


  componentDidMount() {

    if (this.props.user) {
      db.collection('users').doc(this.props.user)
        .get()
        .then(function (doc) {
          let userInfo;
          if (doc.exists) {
            console.log('Document data:', doc.data())
            userInfo = doc.data();
          } else {
            console.log('we aint got it')
          }
          return userInfo
        })
        .then(
          res => {
            console.log('GETTING THE RES: ', res)
            this.setState({
              handle: res.handle
            })
          }
        )
        .catch(function (error) {
          console.log('We aint got it cause: ', error)
        })
    }
  }

  render() {
    return (
      <div className="panel">
        <img id="donke" src={`../img/donke${this.props.avatar.health || this.props.avatar.health === 0 ? this.props.avatar.health : 10}.svg`} onClick={() => playAudio('happy')} />
        <div className="renderBuddyName">
          {this.props.name !== '' && this.props.avatar.health >= 9 && this.props.loggedIn
            ?
            <p id="buddyName">Hello, {this.state.handle}!  My name is {this.props.avatar.name}!</p>
            :
            null
          }
          {this.props.avatar.health === 0
            ?
            <p id="buddyName">Oh NO! You've killed {this.props.avatar.name}!</p>
            :
            null
          }
        </div>

      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    avatar: state.avatar,
    user: state.user
  }
}

export default connect(mapStateToProps)(Donke)


