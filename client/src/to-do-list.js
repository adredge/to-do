import React, { Component } from 'react';
import Client from "./Client";
import './to-do-list.css';
import ListItem from './list-item'


class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: {
                _id: "",
                items: []
            },  
            addItemName: ""
        };
    }

    componentWillMount() {
        Client.getList()
        .then((list) => {
            this.setState({
                list: list
            })
        });
    };

    renderListItems = () => {
        if(!this.state.list || !this.state.list.items || this.state.list.items.length === 0) return
        return this.state.list.items.map(item => <ListItem key={item._id} item={item} removeItem={this.removeItem}/>)
    }

    removeItem = (itemId) => {
        Client.removeItem(this.state.list._id, itemId)
        .then(list => {
            this.setState({
                list: list
            })
        })
    }


    addItem = () => {
        Client.addItem(this.state.list._id, this.state.addItemName)
        .then(list => {
            this.setState({
                list: list,
                addItemName: ""
            })
        });

    }

    handleChange = (event) => {
        this.setState({addItemName: event.target.value});
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.addItem()
        }
    }

    render() {
        return (
            <div>
                <ul className="list">
                    {this.renderListItems()}
                </ul>
                <div className="add-item">
                    <input type="text" className="add-item-input" name="add-item-input" placeholder="Add item..." value={this.state.addItemName} onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
                    <button className="add-item-button" onClick={this.addItem}>Add</button>
                </div>
            </div>
        );
    }
}

export default ToDoList;
