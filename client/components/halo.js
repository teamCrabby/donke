import React, { Component } from 'react';
import { dead } from '../library/animations';
import { playAudio } from '../library/audio';


export default class Halo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    playAudio('dead');
    dead()
  }

  render() {
    return (
      <div className="panel">
        <img id="halo" src="../img/halo.svg" width="100" height="300" />
      </div>
    );
  }
}