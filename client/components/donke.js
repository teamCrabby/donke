import React, { Component } from 'react';
import { entrance } from '../library/animations';
import { playAudio } from '../library/audio';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';
import store, { fetchHealth } from '../store';


export default class Donke extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   entrance()
  // }


  render() {

    return (
      <div className="panel">
        <img id="animal" src="../img/donke10.svg" width="300" height="450" onClick={() => playAudio('happy')} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    workInterval: state.workInterval,
    breakInterval: state.breakInterval,
    health: state.health
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStoreHealth(health) {
      dispatch(fetchHealth(health))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDonke)

//map state to props
// pull the health property
//src path in backtics `..img/donke${this.props.health}.svg`
//we will also need connect
//export that shiz

