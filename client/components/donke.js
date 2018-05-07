import React, { Component } from 'react';
import { sunRotate } from '../library/animations'
import { playAudio } from '../library/audio'


export default class Donke extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    sunRotate();
  }


  render() {

    return (
      <div className="panel">
        <img id="sunFace" src="../img/sunFace.svg" width="175" height="175"/>
        <img id="sunRays" src="../img/sunRays.svg" width="175" height="175" />
        <img id="donke" src="../img/donke.svg" width="300" height="400" onClick={() => playAudio('happy')} />
        <img id="grass" src="../img/grass.svg" width="500"/>
      </div>
    )
  }
}


