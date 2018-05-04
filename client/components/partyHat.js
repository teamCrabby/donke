import React, { Component } from 'react';
import { dragHat } from '../library/animations'

export default class PartyHat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

    dragHat()
  }

  render() {
    return (
      <div className="draggable-box">
        <img className="draggable-item draggable-hat" id="hat" src="../img/partyHat.svg" width="100" height="100" />
      </div>
    );
  }
}