import React, {Component} from 'react';
import '../../../App.css';
import axios from 'axios';

/** Sign Up component
  * Contains markup and logic for signUp
  **/
class SignIn extends Component {
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
        localStorage.setItem('UserId', response.data._id);
        this.props.history.push('/');
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
        <h3>Enter your name and password to sign in</h3>
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
          <input type="submit" value="Submit" onClick={this.submitSignIn}/>
          {this.state.showError ? <p>{this.state.errorMessage}</p> : ''}
          </div>
      </div>
    );
  };

}

export default SignIn;
