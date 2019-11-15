import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
//import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Checkbox} from 'react-materialize';
import {Button} from 'react-materialize';

class ItemScreen extends Component{
    state = {
      goListScreen: false,
      description: this.props.todoList.items[this.props.id].description,
      assigned_to: this.props.todoList.items[this.props.id].assigned_to,
      due_date: this.props.todoList.items[this.props.id].due_date,
      completed: this.props.todoList.items[this.props.id].completed
    }
    changeTask = (e) =>{
      this.setState({description: e.target.value});
      //this.props.todoList.items[this.props.id].description = e.target.value;
    }
    changeAssigned_to = (e) =>{
      this.setState({assigned_to: e.target.value});
      //this.props.todoList.items[this.props.id].assigned_to = e.target.value;
    }
    changeDueDate = (e) =>{
      this.setState({due_date: e.target.value});
      //this.props.todoList.items[this.props.id].due_date = e.target.value;
    }
    changeCompleted = (e) =>{
      this.setState({completed: e.target.checked});
      //this.props.todoList.items[this.props.id].completed = e.target.checked;
      //console.log(this.props.todoList.items[this.props.id].completed);
      //this.forceUpdate();
    }
    addItem = (e) =>{
      this.props.todoList.items[this.props.id].description = this.state.description;
      this.props.todoList.items[this.props.id].assigned_to = this.state.assigned_to;
      this.props.todoList.items[this.props.id].due_date = this.state.due_date;
      this.props.todoList.items[this.props.id].completed = this.state.completed;
      this.props.todoList.items[this.props.id].newItem = false;
      const firestore = getFirestore();
      firestore.collection("todoLists").doc(this.props.todoList.key).update({items: this.props.todoList.items});
      this.setState({goListScreen: true});
    }
    cancelItem = (e) =>{
      if (this.props.todoList.items[this.props.id].newItem == true){
        this.props.todoList.items = this.props.todoList.items.filter(i => i !== this.props.todoList.items[this.props.id]);
        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.key).update({items: this.props.todoList.items});
      }
      this.setState({goListScreen: true});
    }
    render(){
        if (this.state.goListScreen == true){
          return <Redirect to ={`/todoList/${this.props.todoList.key}`}></Redirect>
        }
        return(
          <div className="container beige">
            <div className="input-field">
              <label>Task:</label>
              <input className="active" type="text" name="description" id="name" onChange={this.changeTask} defaultValue={this.state.description}/>
            </div>
            <div className="input-field">
              <label>Assigned To:</label>
              <input className="active" type="text" name="assigned_to" id="owner" onChange={this.changeAssigned_to} defaultValue={this.state.assigned_to}/>
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="dueDate" onChange={this.changeDueDate} defaultValue={this.state.due_date}/>
            </div>
            <div>
              <Checkbox label="Completed" checked={this.state.completed} onChange={this.changeCompleted}/>
            </div>
            <div>
            <Button waves="light" style={{marginRight: '5px', background: 'black'}} onClick={this.addItem}>Submit</Button>
            <Button waves="light" style={{marginRight: '5px', background: 'black'}} onClick={this.cancelItem}>Cancel</Button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.match.params;
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    console.log("Key: " + key);
    const todoList = todoLists ? todoLists[key] : null;
    todoList.key = key;
    console.log("TodoList " + todoList);
    console.log("ID: " + id);
    //todoList.id = id;
  
    return {
      todoList,
      key,
      id,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);