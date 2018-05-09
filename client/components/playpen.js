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

  // componentDidMount() {
  //   this.setState({
  //     playPenName: event.target.playPenName,
  //     inviteName: event.target.inviteName
  //   })
  // }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    return (
      <div className="formContainer">
        <div className="playPen">
          <form onSubmit={this.handleSubmit}>
            <label>Pick a name for your playpen: </label>
            <div>
              <input name='playPenName' type="text" value={this.state.playPenName} onChange={this.handleChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="pickFriend">
          <form onSubmit={this.handleSubmit}>
            <label>Who do you want to invite over?</label>
            <select name="inviteName" onChange={this.handleChange}>
              {
                ['boddy', 'suzie', 'trashcan', 'poopsie', 'puberty'].map((name, idx) => {
                  return (<option key={idx}>{name}</option>)
                })
              }
            </select>
          </form>
        </div>
      </div>
    )
  }
}
