import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  postsFetchData } from '../components/posts/actions';


class App extends Component {
    componentDidMount(){
        this.props.fetchData('http://127.0.0.1:8000/api/posts/');
    }

    onClickSeeMore(){
        console.log('veo mas');
    }

    onClickEdit(){
        console.log('edito');
    }

    onClickDelete(){
        console.log('borro');
    }
    
    const styleCard = {

    };
    render() {       
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
    
        if (this.props.isLoading) {
            return <p>Loading Posts...</p>;
        }

        return (
        <div className = "body">
            {this.props.posts.map(post => (
                <div className="card mx-auto" style={} key={post.id}>
                    <div className="card-body">
                        <h5 className="card-header">{post.title}
                            <a href="#"> 
                                <span className="badge" onClick={this.onClickEdit}>Edit</span>
                            </a>
                            <a href="#">
                                <span className="badge" onClick={this.onClickDelete}> Delete </span>
                            </a>
                        </h5>
                        <p className="card-text">{post.description}</p>
                        <button className="btn btn-primary" onClick={this.onClickSeeMore}>See more...</button>
                    </div>
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