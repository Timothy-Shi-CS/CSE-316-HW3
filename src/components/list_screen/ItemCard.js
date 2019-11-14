import React from 'react';

class ItemCard extends React.Component {
    state = {
        itemScreen: false
    }

    showItemScreen = (e) =>{

    }

    render() {
        if (this.state.itemScreen == true){
            //return (<Redirect to = "")
        }
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3 light grey">
                    <div className="row" onClick = {this.showItemScreen}>
                        <span className="col s3">{item.description} <div>Assigned To: {item.assigned_to}</div></span>
                        <span className="col s3">{item.due_date}</span>
                        <span className="col s3">{item.completed ? "Completed" : "Pending"}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;