import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    state = {
        listId: null
    }
    handleNewList = (e) =>{
        const firestore = getFirestore();
        const { target } = e;
        firestore.collection("todoLists").add({
            date: new Date(),
            name: "unknown",
            owner: "unknown",
            items: []
        }).then(docRef => {
            this.setState({listId: docRef.id});
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if (this.state.listId != null){
            return <Redirect to={'/todoList/' + this.state.listId}/>;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks todoLists={this.props.todoLists}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);