import React, { Component } from 'react';
import './App.css';
import Comments from 'frontCompomenets/Comments';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Social Torah</h1>
          <Comments />
        </header>
      </div>
    );
  }
}

export default App;
