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

    renderCompletedDetails = (item) => {
        if(item.complete) {
            return (<div className="completedAt">
                        Completed {item.completedAt}
                    </div>)
        }
        return;
    }
    
    render() {

        var item = this.props.item;

        return (
            <li className="item" {...this.props.children}>
                <div className="itemContent">
                    <input type="checkbox" 
                        className="listCheckbox"
                        name={item.id} 
                        checked={item.complete} 
                        onChange={this.handleCheck}/>
                    <div className="displayText">
                        <div>
                            {item.name}
                        </div>
                        {this.renderCompletedDetails(item)}
                    </div>
                </div>
            </li>
        );
    }
}

export default ListItem;
