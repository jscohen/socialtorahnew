import React, {Component} from 'react';
import '../../../App.css';
import axios from 'axios';

/** Sign Up component
  * Contains markup and logic for signUp
  **/
class LogOut extends Component {
  constructor() {
    super()
  }

  /** Sends server request to log out **/
  logOut = () => {
    axios.delete('/user/signOut', {params: {
        id: localStorage.getItem('UserId'),
        token: localStorage.getItem('Token')
      }
    })
    .then(() => {
      localStorage.removeItem('UserName')
      localStorage.removeItem('Token')
      localStorage.removeItem('UserId')
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
