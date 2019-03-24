import React from 'react';
import SignUp from './SignUp';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

describe('Renders Component without crashing and takes input', () => {
  const emailEvent = {
    target: {
      value: 'testEmail',
    },
  };

  const passwordEvent = {
    target: {
      value: 'testPassword',
    },
  };

  const signUp = shallow(<SignUp />);
  const componentInstance = signUp.instance();

  it('renders without crashing', () => {
    shallow(<SignUp />);
  });

  it('takes input for email and stores to state', () => {
    expect(componentInstance.state.email).toEqual('');
    componentInstance.setEmail(emailEvent);
    expect(componentInstance.state.email).toEqual('testEmail');
  });

  it('takes input for password and stores to state', () => {
    expect(componentInstance.state.password).toEqual('');
    componentInstance.setPassword(passwordEvent);
    expect(componentInstance.state.password).toEqual('testPassword');
  });
});

describe('API Call works properly', () => {
  const emailEvent = {
    target: {
      value: 'testEmail',
    },
  };

  const passwordEvent = {
    target: {
      value: 'testPassword',
    },
  };

  const signUp = shallow(<SignUp />);
  const instance = signUp.instance();
  instance.setEmail(emailEvent);
  instance.setPassword(passwordEvent);

  const returnedObject = {
    data: {
      email: 'testEmail',
      id: expect.any(String),
      token: expect.any(String),
    },
  };

  it('Creates successful API call with valid input', () => {
    expect(instance.state.showError).toBe('');
    expect(instance.state.errorMessage).toBe('');
    expect(instance.state.email).toBe('testEmail');
    instance.submitSignUp();
    expect(instance.state.showSignUp).toBe(false);
    expect(instance.state.showWelcome).toBe(true);
    expect(instance.state.isLoggedIn).toBe(true);
  });
});
