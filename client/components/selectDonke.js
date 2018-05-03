import React, { Component } from 'react';
import Donke from './donke';
import DonkeSick from './donkeSick';

export default class SelectDonke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      happy: true,
      break: true,
      health: 10
    }
    this.handleClick = this.handleClick.bind(this)
  }
//when it first mounts, donke is happy, button doesn't render, message that says 'happy working!'
//after a set time, donke is sick, button renders to "take a break", message says 'i need a break!', health starts decrementing
//if click 'take a break', donke is happy, health is incrementing
  componentDidMount(){
    setTimeout(() => {
      this.setState({ happy: !this.state.happy })
    })
  }

  handleClick(){
    this.setState({ happy: !this.state.happy });
//want it to change the state and start a timer to prompt the user with something else
//time in the setTimeout is determined by user input
    setTimeout(() => {alert("woot!")}, 3000);
  }

  render() {
    return (
      <div>
        <div>
          {this.state.happy 
            ? <div>
                <Donke/> 
                <button onClick={this.handleClick}>BUTT-ON</button>
              </div>
            : <DonkeSick/>}
        </div>
        <button onClick={this.handleClick}>BUTT-ON</button>
      </div>
    )
  }
}
