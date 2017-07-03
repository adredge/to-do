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
        console.log('here!')
        Client.getLists("userId", (lists) => {
            console.log('got it ', lists)
            this.setState({
                lists: lists
            })
        });
    };

    renderListItems = () => {
        return this.state.lists.map(list => return <ListItem item={list} />)
    }
//ListItem
    render() {
        return (
            <ul>
                {this.renderListItems}
            </ul>
        );
    }
}

export default ToDoList;
