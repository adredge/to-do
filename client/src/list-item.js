import React, { Component } from 'react';
import Client from "./Client";
import './list-item.css';

class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: props.item,
        };
    }

    uncheckItem = () => {
        Client.uncheckItem(this.state.item._id)
        .then(() => {
            this.setState({item: {...this.state.item, complete: false, completedAt: null}})
        })
    }

    checkItem = () => {
        const completedAt = new Date().toLocaleString()
        Client.checkItem(this.state.item._id, completedAt)
        .then(() => {
            this.setState({item: {...this.state.item, complete: true, completedAt: completedAt}})
        })
    }
    
    handleCheck = () => {
        if(this.state.item.complete)
            {console.log('unchecking item')
            this.uncheckItem()
            }
        else
            {
                console.log('checking item')
            this.checkItem()
            }
    }

    removeItem = () => {
        this.props.removeItem(this.state.item._id)
    }
    
    renderCompletedDetails = (item) => {
        if(item.complete) {
            return (<div className="completedAt">
                        Completed {new Date(item.completedAt).toLocaleString()}
                        {/* {moment(item.completedAt, "YYY-MM-DDTHH:mm:ssZ").toDate()} */}
                    </div>)
        }
        return;
    }
    
    render() {

        var item = this.state.item;

        return (
            <li className="item" {...this.props.children}>
                <div className="itemContent">
                    <input type="checkbox" 
                        className="listCheckbox"
                        name={item._id} 
                        checked={item.complete} 
                        onChange={this.handleCheck}/>
                    <div className="displayText">
                        <div>
                            {item.name}
                        </div>
                        {this.renderCompletedDetails(item)}
                    </div>
                    <a href="#" onClick={this.removeItem}>REMOVE</a>
                </div>
            </li>
        );
    }
}

export default ListItem;
