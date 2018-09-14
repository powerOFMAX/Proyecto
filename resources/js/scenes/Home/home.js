import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchData } from "../../actions/postsActions";


class Home extends Component {
    componentDidMount(){
        this.props.fetchData('http://127.0.0.1:8000/api/posts/');
    }
    
    onClickSeeMore(){
        console.log('veo mas');
    }
    
    onClickEdit(){
        console.log('edito');
    }
    
    onClickDelete(id){
        console.log(this.state);
        
        alert('Do you want to delete post '+id+' ?');
        this.props.posts.filter(function (post){
            return post.id.value !== id;
        });
        if(success){
            console.log('asdasdasd');
        }
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
            return (
                <div className = "container">
                {this.props.posts.map(post => (
                    <div className="card col-lg mt-4" key={post.id}>
                        <div className="card-body">
                            <h5 className="card-header">
                            {post.title}
                                <Link to={'/edit/'+post.id}>
                                    <span className="badge" onClick={this.onClickEdit}>Edit</span>
                                </Link>
                                    <span className="badge" onClick={(id) => this.onClickDelete(post.id)}> Delete </span>
                            </h5>
                            <p className="card-text">{post.description.substring(0,100)}...</p>
                            <Link to= {'/post/'+post.id}>
                                <button className="btn btn-primary" onClick={this.onClickSeeMore}>See more...</button>
                            </Link>
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
        hasError: state.HaveError
    };    
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};


export default connect(mapStateToProps, mapsDispatchToProps) (Home);