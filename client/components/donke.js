import React, { Component } from 'react';
import { playAudio } from '../library/audio';
import { connect } from 'react-redux';


class Donke extends Component {
  constructor(props) {
    super(props);


  }


  render() {

    return (
      <div className="panel">
        <img id="donke" src={`../img/donke${this.props.health}.svg`} onClick={() => playAudio('happy')} />
        {this.props.name !== ''
          ? <p id="buddyName">Hello, I'm {this.props.name}!</p>
          :
          null
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    name: state.avatar.name,
    health: state.health
  }
}

export default connect(mapStateToProps)(Donke)


