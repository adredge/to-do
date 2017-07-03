import React, { Component } from 'react';
import './list-item.css';

class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemId: props.item.id
        };
    }

    // componentWillMount(){
    //     this.setState({itemId: })
    // }

    handleCheck = () => {
        console.log('handle check: ', this.state.itemId)
    }
    
    render() {

        var item = this.props.item;

        return (
            <li className="item" {...this.props.children}>
                <input type="checkbox" 
                    className="listCheckbox"
                    name={item.id} 
                    checked={item.complete} 
                    onChange={this.handleCheck}/>
                {item.name}
            </li>
        );
    }
}

export default ListItem;
