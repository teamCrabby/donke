import React, { Component } from 'react';
import { dragHat } from '../library/animations'

export default class PartyHat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('let me get in here')

    dragHat()
  }

  render() {
    return (
      <div className="draggableHat">
        <img id="partyHat" src="../img/PartyHat.svg" width="100" height="100" />
      </div>
    );
  }
}