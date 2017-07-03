import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    lists: [{name: "List 1", id: 1}, {name: "List 2", id: 2}]
  };

  render() {

    const listNameItems = this.state.lists.map(list => (
      <li>{list.name}</li>
    ));

    return (
      <div className="App">
        <div className="App-header">
          <h2>Your lists</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <ul>
        {listNameItems}
      </ul>
      </div>
    );
  }
}

export default App;
