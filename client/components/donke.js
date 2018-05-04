import React, { Component } from 'react';
import { entrance } from '../library/animations'


export default class Donke extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    entrance()
  }

  handleClick(){
    console.log('HANDLE CLICK')

    let audio = new Audio('http://www.brunover.com/wav_gif/donkey.wav')
    audio.play()

  }

  render() {

    return (
      <div className="panel">
        <img id="animal" src="../img/donke.svg" width="300" height="450" onClick={this.handleClick}/>
      </div>
    );
  }
}


