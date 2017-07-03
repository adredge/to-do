import React, { Component } from 'react';
//import './list-item.css';

class ListItem extends Component {

    render() {
        var item = this.props.item;

        return (
            <li key={item.id}>{item.name}</li>
        );
    }
}

export default ListItem;
