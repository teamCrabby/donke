import React, { Component } from 'react';
import { entrance, dead } from '../library/animations'


export default class DonkeDead extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // entrance()
    dead()
  }

  render() {
    return (
      <div className="panel">
        <img id="halo" src="../img/halo.svg" width="100" height="300" />
        <img id="animal" src="../img/dead.svg" width="300" height="450" />
      </div>
    );
  }
}