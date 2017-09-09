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
        Client.getList('test-user')
        .then((list) => {
            this.setState({
                list: list.items
            })
        });
    };

    renderListItems = () => {
        console.log('list', this.state.list)
        return this.state.list.map(item => <ListItem key={item._id} item={item} />)
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
