import React, {Component} from 'react';
import './App.css';
import Comments from './frontComponents/Comments';
import NavBar from './frontComponents/Nav/NavBar';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

/** Main App class
*
**/
class App extends Component {
  /**
  * Renders the App
  * @return {void}
  */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
          <h1>Social Torah</h1>
          <Comments />
        </header>
      </div>
    );
  }
}

export default App;
