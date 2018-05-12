import React, { Component } from 'react';
import { connect } from 'react-redux';
//const firebase = require ("firebase")
import store, { setPlaypenStatus } from '../store';

// var currentuser = firebase.auth().currentUser;

//delete playpen once everyone leaves
//keep track of who has accepted or not?

export class Playpen extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.leavePlaypen = this.leavePlaypen.bind(this)
  }
  componentDidUpdate() {

  }

  leavePlaypen(){
    this.props.setPlaypen(false)
    //add logic to update firebase
  }

  //render donkes -- avatars.forEach... render donkes according to health
  render() {
    return (
      <div>
        <button className='donkeBtn' onClick={this.leavePlaypen}>Leave Playpen</button>
        <p>In a playpen!</p>
        <img id="donke" src={`../img/donke${this.props.health}.svg`} onClick={() => playAudio('happy')} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    health: state.health
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaypen(bool) {
      dispatch(setPlaypenStatus(bool))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playpen)