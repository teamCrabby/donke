import React, { Component } from 'react';
import { sunRotate } from '../library/animations';


export default class Sun extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    sunRotate();
  }


  render() {

    return (
      <div className="panel">
        <img id="sunFace" src="../img/sunFace.svg" />
        <img id="sunRays" src="../img/sunRays.svg" />
      </div>
    )
  }
}
