import React, { Component } from 'react';
import Donke from './donke';
import DonkeSick from './donkeSick';
import SpeechBubble from './speechBubble';
import { connect } from 'react-redux';

//when you click "set time" it sets the work and break intervals
//also want it to start decrementing the time
//i could do this in select donke by watching for the state change?
//or i could do it in navbar

let timerFunc;

export class SelectDonke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      happy: true,
      break: true,
      health: 10,
      // timerFunc: setTimeout(() => {})
    }
    this.handleClick = this.handleClick.bind(this)
    this.workTimer = this.workTimer.bind(this)
    this.breakTimer = this.breakTimer.bind(this)
  }
//when it first mounts, donke is happy
//once user puts in time intervals, donke is happy, render button that says 'take a break', message that says 'happy working!'
//after a set time, donke is sick, button renders to "take a break", message says 'i need a break!', health starts decrementing
//if click 'take a break', donke is happy, health is incrementing, button says 'back to work!'
//if click 'back to work', donke is happy, button says 'take a break', work timer starts
  componentDidMount(){
    let counter = 0;
    let counting = setInterval(() => {
      counter++;
      console.log(counter);
    }, 1000);
  }

  workTimer(){
    //DEBUGGING STUFF
    // console.log('in workTimer');
    // let counter = 0;
    // let counting = setInterval(() => {
    //   counter++;
    //   console.log("work count", counter);
    // }, 1000);

    //ACTUAL CODE WE NEED
    const workInterval = this.props.workInterval * 1000
    let workTimeout = setTimeout(() => {
      this.setState({ happy: !this.state.happy })
      //CLEAR INTERVAL FOR DEBUGGING
      // clearInterval(counting)
    }, workInterval)
    console.log("workTimeout is....", workTimeout)
    timerFunc = workTimeout
  }

  breakTimer(){   
   
    const breakInterval = this.props.breakInterval * 1000;
    let breakTimeout = setTimeout(() => {
      this.setState({ happy: !this.state.happy })
      
    }, breakInterval)
    console.log("breakTimeout is....", breakTimeout)
    timerFunc = breakTimeout;
  }

  handleClick(){
    console.log('timerFunc is...', timerFunc);
    clearTimeout(timerFunc)
    this.setState({ happy: !this.state.happy });
  }


  render() {
    return (
      this.props.workInterval > 0 
      //if the user has submitted time specifications timer is running and render is dependent on timer
      ? <div>
          <div>
            {this.state.happy 
              ? <div>
                  {this.workTimer()}
                  <Donke/> 
                  <button onClick={this.handleClick}>Take a break!</button>
                </div>
              : <div>
                  {this.breakTimer()}
                  <DonkeSick/>
                  <button onClick={this.handleClick}>Work time!</button>
                </div>}
          </div>
        </div>
    //if the user has not submitted time specifications, just render happy donke
    : <Donke/>
    )
  }
}


const mapStateToProps = state => {
  return {
    workInterval: state.workInterval,
    breakInterval: state.breakInterval
  }
}

const mapDispatchToProps = dispatch => {return{}}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDonke)
