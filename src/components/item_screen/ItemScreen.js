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
    render(){
        return(
          <div className="container white">
            <div className="input-field">
              <label>Task:</label>
              <input className="active" type="text" name="description" id="name" onChange={this.handleChange} defaultValue={this.props.todoList.items[this.props.id].description}/>
            </div>
            <div className="input-field">
              <label>Assigned To:</label>
              <input className="active" type="text" name="assigned_to" id="owner" onChange={this.handleChange} defaultValue={this.props.todoList.items[this.props.id].assigned_to}/>
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="dueDate" onChange={this.changeDueDate} defaultValue={this.props.todoList.items[this.props.id].due_date}/>
            </div>
            <div>
              <Checkbox value="Completed" label="Completed" />
            </div>
            <div>
            <Button waves="light" style={{marginRight: '5px'}}>Submit</Button>
            <Button waves="light" style={{marginRight: '5px'}}>Cancel</Button>
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