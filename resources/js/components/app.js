import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Conection with redux
import { Provider } from "react-redux";
import { connect } from 'react-redux';
import { showPosts } from '../components/posts/actions';

import store from "./posts/actions";
//export default class App extends Component {


class App extends Component {
    componentWillMount(){
        this.props.showPosts()
    }
    renderPostsList(){
        return this.props.users.map((user) => {
            return (
                <div key={user.id}>
                    {user.id}
                    {user.name}
                    {user.email}
                </div>
            )
        })
    }

    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Example Component</div>

                                <div className="card-body">
                                Welcome to my blog!
                                {this.renderPostsList()}
                                </div>
                                <button>
                                    hola
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

function mapStateToProps(state){
    return{
        users: state.user.list
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default connect(mapStateToProps, { showPosts }) (App);