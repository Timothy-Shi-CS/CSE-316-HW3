import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: " ",
        owner: " ",
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
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List
                <div>
                    <Button href="#modal1" className="modal-trigger">
                        &#128465;
                    </Button>
                    <Modal id="modal1" header="Delete List?" 
                    actions={
                        <React.Fragment>
                        <Button onClick={this.deleteList}>
                            Yes
                        </Button>
                        <Button modal="close">
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