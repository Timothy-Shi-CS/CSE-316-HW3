import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import addItem from './AddItem.png';
import { firestore } from 'firebase';
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';

class ItemsList extends React.Component {
    state = {
        goItemScreen: false
    }
    reverseTask = false;
    reverseDueDate = false;
    reverseStatus = false;
    addItem = (e) =>{
        const firestore = getFirestore();
        
        this.props.todoList.items.push({
            key: this.props.todoList.items.length, 
            id: this.props.todoList.items.length,
            description: "unknown",
            due_date: "YYYY/MM/DD",
            assigned_to: "unknown",
            completed: false
        });
        firestore.collection("todoLists").doc(this.props.todoList.id).update({items: this.props.todoList.items});
        this.state.goItemScreen = true;
        //console.log(this.props.todoList);
        //this.props.history.push('/todoList/' + this.props.todoList.id.toString() + "/item/" + this.props.todoList.items[this.props.todoList.items.length - 1].id.toString()); 
    }

    sortTask = (e) =>{
        const firestore = getFirestore();
        var ls = this.props.todoList.items;
        if (this.reverseTask == false){
            ls.sort(function(a, b){
                if (a.description < b.description) {return -1;}
                if (a.description > b.description) {return 1;}
                return 0;
            })
            this.reverseTask = true;
        }
        else{
            ls.sort(function(a, b){
                if (a.description < b.description) {return 1;}
                if (a.description > b.description) {return -1;}
                return 0;
            })
            this.reverseTask = false;
        }
        firestore.collection("todoLists").doc(this.props.todoList.id).update({items: ls});
    }

    sortDueDate = (e) =>{
        const firestore = getFirestore();
        var ls = this.props.todoList.items;
        if (this.reverseDueDate == false){
            ls.sort(function(a, b){
                if (a.due_date < b.due_date) {return -1;}
                if (a.due_date > b.due_date) {return 1;}
                return 0;
            })
            this.reverseDueDate = true;
        }
        else{
            ls.sort(function(a, b){
                if (a.due_date < b.due_date) {return 1;}
                if (a.due_date > b.due_date) {return -1;}
                return 0;
            })
            this.reverseDueDate = false;
        }
        firestore.collection("todoLists").doc(this.props.todoList.id).update({items: ls});
    }

    sortStatus = (e) =>{
        const firestore = getFirestore();
        var ls = this.props.todoList.items;
        if (this.reverseStatus == false){
            ls.sort(function(a, b){
                if (a.completed < b.completed) {return -1;}
                if (a.completed > b.completed) {return 1;}
                return 0;
            })
            this.reverseStatus = true;
        }
        else{
            ls.sort(function(a, b){
                if (a.completed < b.completed) {return 1;}
                if (a.completed > b.completed) {return -1;}
                return 0;
            })
            this.reverseStatus = false;
        }
        firestore.collection("todoLists").doc(this.props.todoList.id).update({items: ls});
    }
    
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        //console.log("ItemsList: todoList.id " + todoList.id);
        if (this.state.goItemScreen == true){
            //console.log("ItemID: " + this.props.todoList.items[this.props.todoList.items.length - 1].id);
            return <Redirect to = {`/todoList/${this.props.todoList.id}/item/${this.props.todoList.items[this.props.todoList.items.length - 1].id}`}>
            </Redirect>
        }
        return (
            <div className="todo-lists section">
                <div className="row green">
                    <span className="col s3" onClick = {this.sortTask}>Task</span>
                    <span className="col s3" onClick = {this.sortDueDate}>Due Date</span>
                    <span className="col s3" onClick = {this.sortStatus}>Status</span>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} />
                    );})
                }
                <div className="row" src={addItem} onClick={this.addItem}>+</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);