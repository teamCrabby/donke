import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { db, auth, authAdmin } from '../app'
import { setPlaypenStatus } from '../store'
import { blop } from '../library/audio'

class PlaypenForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onToggle: this.props.disabled,
      playPenName: '',
      invitedUser: '',
      users: [],
      owner: '',
      avatars: [],
      workInterval: '',
      breakInterval: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddABuddy = this.handleAddABuddy.bind(this)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  componentDidMount() {
    let user = firebase.auth().currentUser
    if (user !== null) {
      db.collection('users').doc(user.uid).get()
        .then(res => {
          let userinFS = res.data()
          console.log('USER FROM FIRESTORE IS WHAT I WANT TO SEE:', userinFS.handle)
          this.setState({ owner: { name: userinFS.handle, email: user.email, uid: user.uid } })
        })
    }
  }

  handleSubmit(event) {
    blop()
    console.log('this.state.workInterval', this.state.workInterval)
    console.log('this.state.breakInterval', this.state.breakInterval)
    db.collection('playPen').add({
      name: this.state.playPenName,
      users: [...this.state.users, this.state.owner.name],
      owner: this.state.owner.name,
      avatars: [...this.state.avatars, this.props.avatar],
      workInterval: this.state.workInterval,
      breakInterval: this.state.breakInterval
    })
      .then((res) => {
        // console.log('CREATED PLAYPEN RES', res)
        return db.collection('playPen').doc(res.id).get()
          .then((res) => {
            let playpen
            playpen = res.data()
            playpen.id = res.id
            console.log('GOT PLAYPEN', playpen)
            return playpen
          })
      })
      .then(pen => {
        console.log('PLAYPEN RETURNED', pen)
        console.log('THE AVATARS TO BE UPDATED', this.state.avatars)
        let bool = true
        return pen.avatars.map(avatar => {
          if (this.props.user === avatar.userId) {
            bool = false
          } else {
            bool = true
          }
          db.collection('avatars').doc(avatar.id).update({
            invited: bool,
            playpenId: pen.id
          }).then((res) => {
            return
          })
        })
      })
      .then((res) => {
        this.props.setPlaypen(true)
        console.log('Document successfully written, HOORAY')
      })
      .catch((error) => console.log(`Unable to save playpen ${error.message}`))
    this.setState({ onToggle: false, invitedUser: '', users: [] })
  }

  handleAddABuddy(event) {
    blop()
    event.preventDefault()
    if (this.state.users.indexOf(this.state.invitedUser) === -1) {
      return db.collection('users').where('handle', '==', this.state.invitedUser)
        .get()
        .then(function (querySnapshot) {
          console.log('query snap', querySnapshot)
          let foundUser;
          if (querySnapshot.docs.length) {
            querySnapshot.forEach(function (doc) {
              foundUser = doc.data()
              foundUser.id = doc.id
            })
          } else {
            alert(`Unable to find your buddy`)
          }
          return foundUser
        })
        .then((user) => {
          // console.log('USER', user)
          return db.collection('avatars').where('userId', '==', user.id)
            .get()
            .then(function (querySnapshot) {
              let foundAvatar;
              if (querySnapshot.docs.length) {
                querySnapshot.forEach(function (doc) {
                  // console.log(doc.id, '==>', doc.data())
                  foundAvatar = doc.data()
                  foundAvatar.id = doc.id
                  console.log('FOUND AVATAR:', foundAvatar)
                })
              } else {
                alert(`Sorry, that user does not have an avatar.`)
              }
              // console.log('FOUND AVATAR OUTSIDE FOR EACH', foundAvatar)
              return foundAvatar;
            })
        })
        .then(avatar => {
          console.log("")
          //update avatar here with invited and playpen id : db.collection('avatar').doc(avatar.id).update
          // db.collection('avatar').doc(avatar.id).update({
          // })
          console.log('AVATAR', avatar)
          this.setState({
            invitedUser: '',
            users: [this.state.invitedUser, ...this.state.users],
            avatars: [avatar, ...this.state.avatars]
          })
          // console.log('users array is...', this.state.users)
          // console.log('avatars array is ...', this.state.avatars)
        })
        .catch(error => {
          console.error(`Sorry, cannot find your friend ${error.message}`)
        })
    } else {
      alert(`User ${this.state.invitedUser} already added`)
    }
  }

  handleChange(event) {
    if(event.target.name !== 'playPenName'){
      this.setState({ [event.target.name]: (event.target.value).toLowerCase() })
    } else if (event.target.value.length <=15) {
      this.setState({ [event.target.name]: (event.target.value) })
    } else {
      alert (`Play pen name can be no longer than 15 characters.`)
    }
    
  }

  handleRemoveUser(event, index) {
    blop()
    let updatedUsers = this.state.users.filter((user, idx) => {
      return idx !== index
    })
    let updatedAvatars = this.state.avatars.filter((avatar, idx) => {
      return idx !== index
    })
    this.setState({ users: updatedUsers, avatars: updatedAvatars })
  }

  render() {
    let { status } = this.props
    let warning;
        
        if (!this.state.playPenName) {
            warning = 'Please enter a playpen name.'
        } else if (!this.state.users.length) {
            warning = 'Please invite someone to your playpen.'
        } else if (!this.state.workInterval) {
            warning = 'Please enter how much time you want to work before going on a break.'
        } else if ( isNaN ( Number(this.state.workInterval) ) ) {
            warning = "Please enter a work interval in numbers. Hint: '70' = one hour ten minutes."
        } else if ( this.state.workInterval > 120 || this.state.workInterval < 1 ) {
            warning = "Please enter a work interval between two hours (120 minutes) and one minute."
        } else if (!this.state.breakInterval) {
            warning = 'Please enter how long you want your breaks to last.'
        } else if ( isNaN ( Number(this.state.breakInterval) ) ) {
            warning = "Please enter a break interval in numbers. Hint: '10' = ten minutes."
        } else if ( this.state.breakInterval < 5 ) {
            warning = "Please enter a break interval that is at least five minutes long."
        } 
        //disable the button if admin does not behave
        let functional = false;
        if (
            !this.state.playPenName ||
            !this.state.users.length ||
            !this.state.workInterval || 
            isNaN ( Number(this.state.workInterval) ) || 
            this.state.workInterval > 120 || this.state.workInterval < 1 || 
            !this.state.breakInterval || 
            isNaN ( Number(this.state.breakInterval) ) ||
            this.state.breakInterval < 5 ) {
            functional = true;
        }
    return (
      (this.state.onToggle === true && status !== 'break')
        ?
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <div className="navbar-name"> 
              <label>Playpen Name</label>
              <div className="navbar-name">
                <input name='playPenName' placeholder="Insert Name" type="text" value={this.state.playPenName} onChange={this.handleChange} />
              </div>
            </div>
            {/* <div className="navbar-container"> */}
            <div className="navbar-name">
              <label className="navbar-name">Play date with</label>
              <div className="navbar-name">
                {/* <div className="playpenFriends"> */}
                  <input name="invitedUser" placeholder="Insert friend" onChange={this.handleChange} value={this.state.invitedUser} />
                  <div className="friends">
                    {
                      this.state.users.length
                        ?
                        this.state.users.map((user, idx) => {
                          return (
                            <div className="playPen-invitedUser" key={idx}>
                              <div onClick={(e) => this.handleRemoveUser(e, idx)}>{`x ${user}`}</div>
                            </div>
                          )
                        })
                        : null
                    }
                  {/* </div> */}
                </div>
              </div>
              <div>
                <button onClick={this.handleAddABuddy}>ADD A BUDDY</button>
              </div>
            </div>
            <div className="navbar-wrapper">
              <div className="navbar-container-form">
                  <div className="name-holder">
                    <div className="navbar-name">Set Work Interval</div>
                  </div>
                  <div className="interval-select">
                    <input name="workInterval" type="text" onChange={this.handleChange} value={this.state.workInterval}/>
                    <div className="navbar-name">Rec: 52 min</div>
                  </div>
                </div>
              <div className="navbar-container-form">
                <div className="navbar-name">Set Break Interval</div>
                  <div className="interval-select">
                    <input name="breakInterval" type="text" onChange={this.handleChange} value={this.state.breakInterval}/>
                    <div className="navbar-name">Rec: 17 min</div>
                  </div>
              </div>    
            <div>
                <button id="submit-butt" disabled={functional} onClick={this.handleSubmit}>SUBMIT</button>
              </div>
            </div>
              { warning && <div className='alert'>{warning}</div> }
            {/* </div> */}
          </div>
        </div>
        : null
    )
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar,
    user: state.user,
    status: state.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaypen(bool) {
      dispatch(setPlaypenStatus(bool))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaypenForm)