import React, { Component } from 'react';
import { entrance } from '../library/animations'



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
        <img id="animal" src="../img/donke1.png" width="415" height="450" />
      </div>
    );
  }
}


