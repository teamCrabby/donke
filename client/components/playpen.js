import React, { Component } from 'react';
import { connect } from 'react-redux';
//const firebase = require ("firebase")
import store, { setPlaypenStatus } from '../store';

// var currentuser = firebase.auth().currentUser;

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
  }

  //render donkes -- avatars.forEach... render donkes according to health
  render() {
    return (
      <div>
        <button onClick={this.leavePlaypen}>X</button>
        <h1>HELLO DONKE</h1>
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