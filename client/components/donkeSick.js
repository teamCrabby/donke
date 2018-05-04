import React, { Component } from 'react';
import { sick } from '../library/animations'


export default class DonkeSick extends Component {
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
        </div>
        <div>
          <img id="tears" src="../img/tears.svg" width="30" height="30" />
        </div>
      </div>
    );
  }
}


