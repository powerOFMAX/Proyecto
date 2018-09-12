import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Conection with redux
import { connect } from 'react-redux';
import { showPosts } from '../components/posts/actions';

//export default class App extends Component {


class App extends Component {
    constructor(props){
        super(props);
        this.onShowPost = this.onShowPost.bind(this);
    }

    onShowPost(){
        this.props.onShowPost();
    }

    render() {
        return (

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

        );
    }
}
const postsSelector = createSelector(
    state => state.posts,
    posts => posts
);

const mapStateToProps = createSelector(
    postsSelector, (posts) => ({
        posts,
    })    
);

const mapActionsToProps = {
    onShowPost: showPosts
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default connect(mapStateToProps, mapActionsToProps) (App);