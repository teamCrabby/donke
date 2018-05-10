import React, { Component } from 'react';
import { connect } from 'react-redux';
const firebase = require("firebase")

// var currentuser = firebase.auth().currentUser;

export class Playpen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {

  }

  render() {

    return (
      <div>
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


export default connect(mapStateToProps)(Playpen)