import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';

/**
* Class to render nav bar
*/
class NavBar extends Component {
  /** Constructor  */
  constructor() {
    super();
    this.state = {
      showSignUp: false,
      email: '',
      password: ''
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
    axios.post('/signUp', {
      email: this.state.email,
      password: this.state.email
    })
    .then((response) => {
      console.log(respone);
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
        <button onClick={this.showSignUp}>Sign Up</button>
        {this.state.showSignUp ? (
          <div>
            <label>Email</label> <input type="text" value={this.state.email} onChange={this.setEmail}/>
            <label>Password</label><input type="password" value={this.state.password} onChange={this.setPassword}/>
            <input type="submit" value="Submit" onClick={this.submitSignUp}/>
          </div>
        ): ('')}
      </div>
    );
  }
}

export default NavBar;
