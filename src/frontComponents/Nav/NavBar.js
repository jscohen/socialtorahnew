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

  /**
  * @return {void}
  */
  render() {
    return (
      <div className="navDiv">
        {this.state.showWelcome ? <p>Welcome {this.state.email}</p> : ''}
        {this.state.isLoggedIn ? <LogOut />: <button onClick={this.showSignUp}>Sign Up</button>}
        {this.state.showSignUp ? <SignUp />: ('')}
      </div>
    );
  }
}

export default NavBar;
