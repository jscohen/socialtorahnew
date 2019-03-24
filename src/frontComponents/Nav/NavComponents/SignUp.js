import React, {Component} from 'react';
import '../../../App.css';
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
      showError: false,
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
        localStorage.setItem('UserId', response.data.id);
        this.props.history.push('/');
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
      <div className="App">
        <div className="App-header">
        <h3>Enter your name and password to sign up</h3>
        <div className="labelHeader">
          <div className="label">
            <label className="labelText">Email</label>
            <input className="labelInput" type="text" value={this.state.email} onChange={this.setEmail}/>
          </div>
          <div className="label">
            <label className="labelText">Password</label>
            <input className="labelInput" type="password" value={this.state.password}
            onChange={this.setPassword}/>
          </div>
        </div>
          <input type="submit" value="Submit" onClick={this.submitSignUp}/>
          {this.state.showError ? <p className="errorMessage">{this.state.errorMessage}</p> : ''}
          </div>
      </div>
    );
  };
}

export default SignUp;
