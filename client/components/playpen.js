import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { setPlaypenStatus } from '../store';
import { db } from '../app';
import * as firebase from 'firebase';



// var currentuser = firebase.auth().currentUser;



//delete playpen once everyone leaves
//keep track of who has accepted or not?

export class Playpen extends Component {
  constructor(props) {
    super(props);
    this.state = { playpen: {} };
    this.leavePlaypen = this.leavePlaypen.bind(this);
  }

  componentDidMount() {
    console.log('playpen id is...', this.props.avatar.playpenId);
    //if (this.props.avatar.playpenId !== nextProps.avatar.playpenId){
      db
        .collection('playPen')
        .doc(`${this.props.avatar.playpenId}`)
        .get()
        .then(res => {
          let playpen = res.data();
          console.log('playpen is..', playpen);
          console.log('avatars in did mount is..', playpen.avatars);
          this.setState({ playpen });
        })
        .catch(error =>
          console.log(`Unable to get playpen ${error.message}`)
        )
    //}
  }

  leavePlaypen() {
    this.props.setPlaypen(false)
    //reset the users playpen id to null to re-render their individual view
    db
      .collection('avatars')
      .doc(`${this.props.avatar.id}`)
      .update({ playpenId: null })
      .catch(error =>
        console.log(`Unable to reset playpen id ${error.message}`)
      );

    //if the owner leaves the playpen, set all the avatars playpen ids to null and then destroy the playpen
  //  if (this.state.playpen.owner === this.props.avatar.userId) {
  //    this.state.playpen.avatars.forEach(avatar => {
  //      db
  //        .collection('avatars')
  //        .doc(`${avatar.id}`)
  //        .update({ playpenId: null })
  //        .then(() => {
  //          db
  //            .collection('playPen')
  //            .doc(`${this.state.playpen.id}`)
  //            .delete()
  //            .then(() => console.log('playpen deleted!'));
  //        })
  //        .catch(error =>
  //          console.log(
  //            `Unable to reset playpen id ${error.message}`
  //          )
  //        );
  //    });
    //}
  }

  render() {
    const avatarsArr = this.state.playpen.avatars
    return (
      <div>
      {avatarsArr && avatarsArr.length
      ? <div>
          <p>Welcome to: {this.state.playpen.name}</p>
          <button className="donkeBtn" onClick={this.leavePlaypen}>
              Leave Playpen
          </button>
            <div className='playpenComponent'>
            {avatarsArr.map(avatar => {
                return (
                  <div key={avatar.id}>
                    <img src={`../img/donke${avatar.health}.svg`} onClick={() => playAudio('happy')} />
                    <p>{avatar.name}</p>
                  </div>
                )
            })}
            </div>
      </div>  
      : null}   
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaypen(bool) {
      dispatch(setPlaypenStatus(bool))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playpen)