import React, { Component, PropTypes } from 'react';
//Conection with redux
import { connect } from 'react-redux';
import {  postsFetchData } from '../components/posts/actions';


class App extends Component {
    componentDidMount(){
        this.props.fetchData('http://127.0.0.1:8000/api/posts/');
    }

    render() {       
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
    
        if (this.props.isLoading) {
            return <p>Loading Posts...</p>;
        }

        return (
            <div>
                {this.props.posts.map((post) => (
                    <div key={post.id}> 
                        {post.title}
                        {post.description}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        hasError: state.postsHaveError,
        isLoading: state.postsAreLoading
    };    
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(postsFetchData(url))
    };
};


export default connect(mapStateToProps, mapsDispatchToProps) (App);