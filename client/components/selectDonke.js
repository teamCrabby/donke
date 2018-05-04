import React, { Component } from 'react';
import Donke from './donke';
import DonkeSick from './donkeSick';
import DonkeDead from './donkeDead';

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
//when it first mounts, donke is happy, button says 'take a break', message that says 'happy working!'
//after a set time, donke is sick, button renders to "take a break", message says 'i need a break!', health starts decrementing
//if click 'take a break', donke is happy, health is incrementing, button says 'back to work!'
//if click 'back to work', donke is happy, button says 'take a break', work timer starts
  componentDidMount(){
    setTimeout(() => {
      this.setState({ happy: !this.state.happy })
    }, 5000)
  }

  handleClick(){
    this.setState({ happy: !this.state.happy });
//time in the setTimeout is determined by user input
    setTimeout(() => {alert("woot!")}, 3000);
  }

  render() {
    return (
      <div>
        <div>
          {/*this.state.happy 
            ? <div>
                <Donke/> 
                <button onClick={this.handleClick}>Take a break!</button>
              </div>
            : <DonkeSick/>*/}
            <DonkeDead/>
        </div>
        <button onClick={this.handleClick}>BUTT-ON</button>
      </div>
    )
  }
}
