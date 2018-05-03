import React, { Component } from 'react';
import { sick } from '../library/animations'


export default class DonkeSick extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('let me get in here')
    sick()
  }

  render() {
    return (
      <div className="sick">
        <div>
          <img id="noEarD" src="../img/noearDonke.svg" width="300" height="450" />
        </div>
        {/*<div>
          <img id="sadEars" src="../img/sadEars.svg" width="300" height="450" />
        </div>*/}

      </div>
    );
  }
}


