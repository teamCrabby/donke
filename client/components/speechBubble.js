import React, { Component } from 'react';
import { bubbleAlert } from '../library/animations'


export default class SpeechBubble extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    bubbleAlert()
  }

  render() {
    return (
      <div className="speech">
        <img id="bubble" src="../img/quoteBubble.svg" width="300" height="200" />
      </div>
    );
  }
}
