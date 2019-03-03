import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

/** Sign Up component
  * Contains markup and logic for signUp
  **/
class LogOut extends Component {
  constructor() {
    super()
  }

  logOut = (event) => {
    const userToSend = {'email': localStorage.getItem('UserName'),
      'token': localStorage.getItem('Token')}
    axios.delete('/user/signOut', {
      userToSend
    })
    .then(() => {
      localStorage.removeItem('UserName')
      localStorage.removeItem('Token')
      this.setState({
        isLoggedIn: false,
        showWelcome: false
      })
    })
  }

  render() {
    return(
      <button onClick={this.logOut}>Log Out</button>
    )
  }
}

export default LogOut;
