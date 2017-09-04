import React, { Component } from 'react';
import Client from "./Client";
import './to-do-list.css';
import ListItem from './list-item'

class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        };
    }

    componentWillMount() {
        Client.getList("userId")
        .then((list) => {
            this.setState({
                list
            })
        });
    };

    renderListItems = () => {
        return this.state.list.map(item => <ListItem key={item.id} item={item} />)
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
