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
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {

    health: state.health
  }
}

export default connect(mapStateToProps)(Donke)


