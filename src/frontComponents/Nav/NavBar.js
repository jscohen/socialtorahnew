import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import SignUp from './SignUp';
import LogOut from './LogOut';

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
      showSignIn: false
    };
  }

  /** Toggles markup to show sign up labels **/
  showSignUp = () => {
    if (!this.state.showSignUp) {
      this.setState({
        showSignUp: true,
        showSignIn: false
      });
    }
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

  /** Submits sign up for authentication **/
  submitSignUp = () => {
    axios.post('/user/signUp', {
      email: this.state.email,
      password: this.state.email
    })
    .then((response) => {
      if (typeof response.data === 'object') {
        this.setState({
          showSignUp: false,
          email: response.data.email,
          showWelcome: true,
          isLoggedIn: true
        })
        localStorage.setItem('UserName', response.data.email);
        localStorage.setItem('Token', response.data.token);
        localStorage.setItem('UserId', response.data.id)
      }
      else if (typeof response.data === 'string') {
        this.setState({
          errorMessage: response.data,
          showError: true
        })
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
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

  /**
  * @return {void}
  */
  render() {
    return (
      <div className="navDiv">
        {this.state.showWelcome ? <p>Welcome {this.state.email}</p> : ''}
        {this.state.isLoggedIn ?  <button onClick={this.logOut}>Log Out</button> :
        <div>
          <button onClick={this.showSignUp}>Sign Up</button>
          <button onClick={this.showSignIn}>Sign In</button>
        </div>}
        {this.state.showSignUp ?
           <div>
              <label>Email</label>
              <input type="text" value={this.state.email} onChange={this.setEmail}/>
              <label>Password</label>
              <input type="password" value={this.state.password}
                onChange={this.setPassword}/>
              <input type="submit" value="Submit" onClick={this.submitSignUp}/>
                {this.state.showError ? <p>{this.state.errorMessage}</p> : ''}
              </div>
                : ('')}
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
      </div>
    );
  }
}

export default NavBar;
