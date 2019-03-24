import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import {shallow} from 'enzyme';


it('renders without crashing', () => {
  shallow(<App />);
});
