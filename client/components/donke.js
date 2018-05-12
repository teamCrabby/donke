import React, { Component } from 'react'
import { playAudio } from '../library/audio'
import { connect } from 'react-redux'


class Donke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel">
        <img id="donke" src={`../img/donke${this.props.health}.svg`} onClick={() => playAudio('happy')} />
        <div className="renderBuddyName">
          {this.props.name !== '' && this.props.health > 0 && this.props.loggedIn
            ?
            <p id="buddyName">Hello, I'm {this.props.name}!</p>
            :
            null
          }
          {this.props.health === 0
            ?
            <p id="buddyName">Oh NO! You've killed {this.props.name}!</p>
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
    name: state.avatar.name,
    health: state.health,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Donke)


