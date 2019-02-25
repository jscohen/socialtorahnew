import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';

/**
* Class to render nav bar
*/
class NavBar extends Component {
  componentDidMount() {
    if (sessionStorage.getItem('Name')) {
      this.setState({
      email: sessionStorage.getItem('Name'),
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
      isLoggedIn: false
    };
  }

  /** Toggles markup to show sign up labels **/
  showSignUp = () => {
    if (!this.state.showSignUp) {
      this.setState({
        showSignUp: true,
      });
    }
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
          showError: false
        })
        sessionStorage.setItem('Name', response.data.email);
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
  /**
  * @return {void}
  */
  render() {
    return (
      <div className="navDiv">
        {this.state.showWelcome ? <p>Welcome {this.state.email}</p> : ''}
        {this.state.isLoggedIn ? <button onClick={this.logOut}>Log Out</button> : <button onClick={this.showSignUp}>Sign Up</button>}
        {this.state.showSignUp ? (
          <div>
            <label>Email</label> <input type="text" value={this.state.email} onChange={this.setEmail}/>
            <label>Password</label><input type="password" value={this.state.password} onChange={this.setPassword}/>
            <input type="submit" value="Submit" onClick={this.submitSignUp}/>
          </div>
        ): ('')}
        {this.state.showError ? <p>{this.state.errorMessage}</p> : ''}
      </div>
    );
  }
}

export default NavBar;
