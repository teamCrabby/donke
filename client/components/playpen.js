import React, { Component } from 'react';


export default class Playpen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playPenName: '',
      inviteName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    // const newPlayPen = {}
    //submit somewhere
    console.log(`you picked: ${this.state.playPenName}`)
  }

  componentDidMount() {
    this.setState({
      playPenName: this.state.playPenName,
      inviteName: this.state.inviteName
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    return (
      <div className="playPen">
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick a name for your playpen:
      <input type="text" name='playPennName' value={this.state.playPenName} onChange={this.handleChange} />
          </label>
        </form>
      </div>
    )
  }
}


// <label>
// Invite a buddy:
// </label>
// <input type="submit" value="Submit" />