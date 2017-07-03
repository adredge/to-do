import React, { Component } from 'react';
import './App.css';
import ToDoList from './to-do-list'

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="appHeader">
          <h1>Tasks</h1>
        </div>
        <div className="appBody">
            <ToDoList />
        </div>
      </div>
    );
  }
}

export default App;
