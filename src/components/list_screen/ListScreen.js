import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: " ",
        owner: " ",
    }

    componentDidMount(){
        const firestore = getFirestore();
        this.props.todoList.date = new Date();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({date: this.props.todoList.date});
    }

    handleChange = (e) => {
        const firestore = getFirestore();
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        if (target.id == "name"){
            firestore.collection("todoLists").doc(this.props.todoList.id).update({name: target.value});
        }
        else if (target.id == "owner"){
            firestore.collection("todoLists").doc(this.props.todoList.id).update({owner: target.value});
        }
    }

    deleteList = (e) =>{
        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).delete();
        this.props.history.push('/');
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to='/' />;
        }

        return (
            <div className="container beige">
                <h5 className="grey-text text-darken-3">Todo List
                <Button href="#modal1" style={{marginLeft: '437px', background: 'black'}} icon={<Icon class="material-icons">delete</Icon>}className="modal-trigger"></Button>
                <div>
                    <Modal id="modal1" header="Delete List?" 
                    actions={
                        <React.Fragment>
                        <Button onClick={this.deleteList} style={{background: 'black', marginRight: "5px"}}>
                            Yes
                        </Button>
                        <Button modal="close" style={{background: 'black'}}>
                            No
                        </Button>
                        </React.Fragment>
                    }>
                        Are you sure you want to delete this list?
                        <div>
                            This list will not be retrievable.
                        </div>
                    </Modal>
                </div>
                </h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

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
)(ListScreen);