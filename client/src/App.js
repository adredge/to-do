import React, { Component } from 'react';
import Client from "./Client";
import styles from './App.css';

class App extends Component {
  state = {
    lists: [{name: "List Zero", id: 0}]
  };

  handleListLoad = () => {
    Client.getLists("userId", (lists) => {
      this.setState({
        lists: lists
      })
    });
  };

  render() {

    const listNameItems = this.state.lists.map(list => (
      <li key={list.id}>{list.name}</li>
    ));

    return (
      <div className="App">
        <div className="App-header">
          <h2>Your lists</h2>
        </div>
        <p className="App-intro">
            Click <button onClick={this.handleListLoad}>here</button> to get started.
        </p>
        <ul>
        {listNameItems}
        </ul>
      </div>
    );
  }
}

export default App;
