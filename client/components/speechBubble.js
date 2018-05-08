import React, { Component } from 'react';
import { bubbleAlert } from '../library/animations';
import { connect } from 'react-redux';


export class SpeechBubble extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    bubbleAlert()
  }

  render() {
    return (
      <div id="speech">
        <img id="bubble" src="../img/quoteBubble.svg" width="300" height="200" />
        <div id="text"><p>{this.props.text}</p></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    health: state.health
  }
}


export default connect(mapStateToProps)(SpeechBubble)
