import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Icon, Card} from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';

class ItemCard extends React.Component {
    state = {
        itemScreen: false,
    }

    showItemScreen = (e) =>{
        this.setState({itemScreen: true});
        this.setState({edit: true});
    }

    moveItemUp = (e) =>{
        e.stopPropagation();
        if(this.props.item.key > 0){
            const firestore = getFirestore();
            var copy = this.props.item;
            this.props.todoList.items[this.props.item.key] = this.props.todoList.items[this.props.item.key-1];
            this.props.todoList.items[this.props.item.key-1] = copy;
            var i = 0;
            this.props.todoList.items.map(item =>{
                item.key = i;
                item.id = i;
                i++;
            });
            firestore.collection("todoLists").doc(this.props.todoList.id).update({items: this.props.todoList.items});
        }
    }

    moveItemDown = (e) =>{
        e.stopPropagation();
        if(this.props.item.key < this.props.todoList.items.length-1){
            const firestore = getFirestore();
            var copy = this.props.item;
            this.props.todoList.items[this.props.item.key] = this.props.todoList.items[this.props.item.key+1];
            this.props.todoList.items[this.props.item.key+1] = copy;
            var i = 0;
            this.props.todoList.items.map(item =>{
                item.key = i;
                item.id = i;
                i++;
            });
            firestore.collection("todoLists").doc(this.props.todoList.id).update({items: this.props.todoList.items});
        }
    }
    deleteItem = (e) =>{
        e.stopPropagation();
        const firestore = getFirestore();
        this.props.todoList.items = this.props.todoList.items.filter(i => i !== this.props.item);
        var i = 0;
        this.props.todoList.items.map(item =>{
            item.key = i;
            item.id = i;
            i++;
        });
        firestore.collection("todoLists").doc(this.props.todoList.id).update({items: this.props.todoList.items});
    }

    render() {
        if (this.state.itemScreen == true){
            return <Redirect to ={`/todoList/${this.props.todoList.id}/item/${this.props.item.id}`}></Redirect>
        }
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3" style={{marginBottom: '-14px'}}>
                <Card className="card-content grey-text text-darken-3" onClick = {this.showItemScreen}>
                    <div className="row" style={{textAlign: 'left'}}>
                        <span className="col s3" style={{fontWeight: '900', fontSize: '100%'}}>{item.description} <div style={{fontWeight: 'normal', fontSize: '75%'}}>Assigned To:</div><strong style={{fontWeight: 'normal', fontSize: '75%'}}>{item.assigned_to}</strong></span>
                        <span className="col s3" style={{textAlign: 'center'}}>{item.due_date}</span>
                        <span className="col s3" style={item.completed ? {color: "green", textAlign: 'center'}: {color: "red", textAlign: 'center'}}>{item.completed ? "Completed" : "Pending"}</span>
                        <span className="col s3" style={{textAlign: 'center', width: '130px'}}>
                            <Button
                                floating
                                fab={{direction: 'left'}}
                                className="red"
                                medium
                                style={{left: '70%', position: 'relative', bottom:'10%'}}
                            >
                                <Button style={{left: '25%'}} small floating icon={<Icon class="material-icons">arrow_upward</Icon>} className={this.props.item.key == 0 ? "grey": "green"} onClick = {this.moveItemUp}/>
                                <Button style={{left: '25%'}} small floating icon={<Icon class="material-icons">arrow_downward</Icon>} className={this.props.item.key == this.props.todoList.items.length-1 ? "grey": "blue"} onClick = {this.moveItemDown}/>
                                <Button style={{left: '25%'}} small floating icon={<Icon class="material-icons">close</Icon>} className="red" onClick = {this.deleteItem}/>
                            </Button>
                        </span>
                    </div>
                </Card>
            </div>
        );
    }
}
export default ItemCard;