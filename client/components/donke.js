import React, { Component } from 'react'
import { playAudio } from '../library/audio'
import { connect } from 'react-redux'


class Donke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('GIVE ME A HANDLE ON THIS!', this.props.invitedUser)
    return (
      <div className="panel">
        <img id="donke" src={`../img/donke${this.props.avatar.health || this.props.avatar.health === 0 ? this.props.avatar.health : 10}.svg`} onClick={() => playAudio('happy')} />
        <div className="renderBuddyName">
          {this.props.name !== '' && this.props.avatar.health >= 9 && this.props.loggedIn
            ?
            <p id="buddyName">Hello, I'm {this.props.avatar.name}!</p>
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
    invitedUser: state.invitedUser
  }
}

export default connect(mapStateToProps)(Donke)


