import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchContent } from "../../actions/app";
import axios from 'axios';


class Home extends Component {
    componentDidMount(){
        this.props.fetchContent(`/api/posts/`);
    }
    
    onClickSeeMore(){
        
    }
    
    onClickEdit(){
        
    }
    
    onClickDelete(id){
        console.log(this.props);
        let success = confirm(`Do you want to delete post ${id} ?`);

        if(success){
        

            axios.delete(`/api/posts/${id}`);
            console.log('borrado correcto');
        }
    }

    render() {
        if (this.props.content_fech){
            return <h1> Loading Posts!! </h1>
        }

        if (this.props.content_error) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
        return (
            <div className = "container">
            {this.props.content.map(post => (
                <div className = "card row mt-4 " key={post.id}>

                    <div className = "card-header">
                        <div className="col-lg">
                            <h5> {post.title} </h5>
                        </div>

                        <div className="col-lg">
                            <Link to = {`/edit/${post.id}`}>
                                <span className = "badge" onClick = {this.onClickEdit}> Edit </span>
                            </Link>
                                <span className = "badge" onClick = {(id) => this.onClickDelete(post.id)}> Delete </span>
                        </div>

                    </div>

                    <div className = "card-body">
                        <p className = "card-text">{post.description.substring(0,100)}...</p>
                        <Link to = {`/posts/${post.id}`}>
                            <button className = "btn btn-primary" onClick = {this.onClickSeeMore}> See more... </button>
                        </Link>
                    </div>
                </div>
            ))}
            </div>
        );
        }
}

const mapStateToProps = state => ({
    content: state.app.content,
    content_error: state.app.content_error,
    content_fech: state.app.content_fetch
});

const mapsDispatchToProps = dispatch => {
    return {
        fetchContent: url => dispatch(fetchContent(url))
    };
};


export default connect(mapStateToProps, mapsDispatchToProps) (Home);