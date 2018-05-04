import React, { Component } from 'react';
import { sick } from '../library/animations'


export default class DonkeSad extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    sick()
  }

  render() {
    return (
      <div className="sad">
        <div>
          <img id="sadDonke" src="../img/sad.svg" width="300" height="450" />
          <img id="sadEars" src="../img/sadEars.svg" width="300" height="450" />
        </div>
      </div>
    );
  }
}


