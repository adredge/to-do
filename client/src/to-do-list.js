import React, { Component } from 'react';
import Client from "./Client";
import './to-do-list.css';
import ListItem from './list-item'

class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: []
        };
    }

    componentWillMount() {
        Client.getList("userId")
        .then((lists) => {
            this.setState({
                lists
            })
        });
    };

    renderListItems = () => {
        return this.state.lists.map(list => <ListItem key={list.id} item={list} />)
    }

    render() {
        return (
            <ul className="list">
                {this.renderListItems()}
            </ul>
        );
    }
}

export default ToDoList;
