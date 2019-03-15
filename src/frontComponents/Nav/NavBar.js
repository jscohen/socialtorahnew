import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import SignUp from './NavComponents/SignUp';
import LogOut from './NavComponents/LogOut';
import {Link} from 'react-router-dom';

/**
* Class to render nav bar
*/
class NavBar extends Component {
  componentDidMount() {
    if (localStorage.getItem('Token') !== null) {
      this.setState({
        email: localStorage.getItem('UserName'),
        isLoggedIn: true,
        showWelcome: true
      })
    }
  }

  /** Constructor  */
  constructor() {
    super();
    this.state = {
      showSignUp: false,
      email: '',
      password: '',
      errorMessage: '',
      showWelcome: false,
      showError: false,
      isLoggedIn: false,
      showSignIn: false,
      showChangePW: false,
      changePWMessage: '',
      showMessage: false
    };
  }

  /** Toggles markup to show sign up labels **/
  showSignIn = () => {
    if (!this.state.showSignIn) {
      this.setState({
        showSignIn: true,
        showSignUp: false
      });
    }
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

  /** Submits request to sign in **/
  submitSignIn = () => {
    axios.post('/user/signIn', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      if (typeof response.data === 'object') {
        console.log(response.data);
        this.setState({
          showSignIn: false,
          email: response.data.email,
          showWelcome:true,
          isLoggedIn: true
        })
        localStorage.setItem('UserName', response.data.email);
        localStorage.setItem('Token', response.data.token);
        localStorage.setItem('UserId', response.data._id)
      }
      if (typeof response.data === 'string') {
        this.setState({
          errorMessage: response.data,
          showError: true
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  /** Submits Change Password Request **/
  submitChangePW = () => {
    axios.patch('/user/changePW', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      if (typeof response.data === 'string') {
        this.setState({
          changePWMessage: response.data,
          showMessage: true,
          changePW: false
        })
      }
    })
    .catch((err) => {
      this.setState({
        changePWMessage: err.data,
        showMessage: true
      })
    })
  }
  /** Sets email for submission
    * @param={event}
   **/
  setEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  /** Sets password for submission of sign up
    * @param={event}
   **/
  setPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  /** Shows the change password markup **/
  showChangePW = (event) => {
    if (!this.state.showChangePW) {
      this.setState({
        showChangePW: true
      })
    } else {
      this.setState({
        showChangePW: false
      })
    }
  }

  /**
  * @return {void}
  */
  render() {
    return (
      <div className="navDiv">
        {this.state.showWelcome ? <p>Welcome {this.state.email}</p> : ''}
        {this.state.isLoggedIn ?
        <div>
          <button onClick={this.showChangePW}>Change Password</button>
          <button onClick={this.logOut}>Log Out</button>
        </div> :
        <div>
          <Link to ="/signUp">Sign Up</Link>
          <button onClick={this.showSignIn}>Sign In</button>
        </div>}
          {this.state.showSignIn ?
            <div>
              <label>Email</label>
              <input type="text" value={this.state.email} onChange={this.setEmail}/>
              <label>Password</label>
              <input type="password" value={this.state.password}
                onChange={this.setPassword}/>
              <input type="submit" value="Submit" onClick={this.submitSignIn}/>
                {this.state.showError ? <p>{this.state.errorMessage}</p> : ''}
            </div>
          : ('')}
          {this.state.showChangePW ?
            <div>
              <label>New Password</label>
              <input type="password" value={this.state.password} onChange={this.setPassword} />
              <input type="submit" value="Submit" onClick={this.submitChangePW} />
                {this.state.showMessage ? <p>{this.state.changePWMessage}</p> : ''}
            </div>
            : ('')
          }
      </div>
    );
  }
}

export default NavBar;
