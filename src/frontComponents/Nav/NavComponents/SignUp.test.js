import React from 'react';
import SignUp from './SignUp';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import axios from 'axios';
import signUpRequest from './__mocks__/signUpRequest';

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
  jest.mock('./__mocks__/signUpRequest');
  const goodParams = {
    email: 'Jon',
    password: 'Test',
  };

  const badParams = {
    email: 'Jon',
  };

  it('Creates successful API call with valid input', () => {
    return signUpRequest(goodParams).then((response) => {
      expect(response).toEqual(goodParams.email);
    });
  });

  it('Creates failed API call with invalid input', () => {
    return expect(signUpRequest(badParams)).rejects.toThrow('Invalid Input');
  });
});

describe('DOM Functions Properly', () => {
  const signUp = shallow(<SignUp />);
  const componentInstance = signUp.instance();
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

  const goodParams = {
    email: 'Jon',
    password: 'Test',
  };

  const badParams = {
    email: 'Jon',
  };

  it('Shows error in dom with band input', () => {
    componentInstance.state.showError = true;
    componentInstance.state.errorMessage = 'Invalid Input';
    expect(signUp.exists('.errorMessage')).toEqual(true);
  });
});
