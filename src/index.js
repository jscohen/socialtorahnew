import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import SignUp from './frontComponents/Nav/NavComponents/SignUp';
import SignIn from './frontComponents/Nav/NavComponents/SignIn';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] =
'application/x-www-form-urlencoded';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
