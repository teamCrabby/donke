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
        <img id="sunFace" src="../img/sunFace.svg"/>
        <img id="sunRays" src="../img/sunRays.svg"/>
        <img id="donke" src="../img/donke10.svg" onClick={() => playAudio('happy')} />
        <img id="grass" src="../img/grass.svg"/>
      </div>
    )
  }
}


