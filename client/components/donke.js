import React, { Component } from 'react';
import { entrance } from '../library/animations';
import { playAudio } from '../library/audio';
// import idler fasdfrom 'desktop-idle'
// var idler = require('desktop-idle');

export default class Donke extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   entrance()
  // }


  render() {

    return (
      <div className="panel">
        <img id="animal" src="../img/donke10.svg" width="300" height="450" onClick={() => playAudio('happy')} />
      </div>
    );
  }
}


