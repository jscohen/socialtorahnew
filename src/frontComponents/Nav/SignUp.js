import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

/** Sign Up component
  * Contains markup and logic for signUp
  **/
class SignUp extends Component {
  /** Constructor method
    * @param = {props}
  **/
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showError: '',
      errorMessage: ''
    }
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

  /** React Render Method
    * @return = {void}
   **/
  render() {
    return (
      <div>
        <label>Email</label>
        <input type="text" value={this.state.email} onChange={this.setEmail}/>
        <label>Password</label>
        <input type="password" value={this.state.password}
          onChange={this.setPassword}/>
        <input type="submit" value="Submit" onClick={this.submitSignUp}/>
        {this.state.showError ? <p>{this.state.errorMessage}</p> : ''}
      </div>
    );
  };
}

export default SignUp;
