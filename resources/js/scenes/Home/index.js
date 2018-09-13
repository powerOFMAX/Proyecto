import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchData } from "../../actions/postsActions";


class Index extends Component {
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
    
    onClickHome(e){
        console.log('tamos en el home');
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
            return (
                <div className = "body">
                    <div className="navbar" href="/" onClick={this.onClickHome}> Home </div>   

                {this.props.posts.map(post => (
                    <div className="card .mx-auto" key={post.id}>
                        <div className="card-body">
                            <h5 className="card-header">{post.title}
                                <Link to={'/edit/1'}>
                                    <span className="badge" onClick={this.onClickEdit}>Edit</span>
                                </Link>
                                <Link to={'/delete/'}>
                                    <span className="badge" onClick={this.onClickDelete}> Delete </span>
                                </Link>
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
        hasError: state.HaveError
    };    
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};


export default connect(mapStateToProps, mapsDispatchToProps) (Index);