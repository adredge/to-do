import React, { Component } from 'react';
import './App.css';
import ToDoList from './to-do-list'

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="appHeader">
          <h2>Your lists</h2>
        </div>
        <p className="appIntro">
            Click <button onClick={this.handleListLoad}>here</button> to get started.
        </p>
        <div className="appBody">
            <ToDoList />
        </div>
      </div>
    );
  }
}

export default App;
