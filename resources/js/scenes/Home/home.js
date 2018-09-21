import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { fetchContent } from "../../actions/app";
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        this.props.fetchContent(`/api/posts/`);
    }

    componentDidUpdate(prevProps){
        if(this.props.content.length !== prevProps.content.length){
            this.setPost();
        }
    }
    
    setPost(){
        this.setState({
            posts: this.props.content
        })
    }
    
    handleDelete(id){
        if(!confirm(`Do you want to delete post ${id} ?`)) return false;
        try{
            axios.delete(`/api/posts/${id}`);
                this.setState({
                    posts: this.props.content.filter(post => {
                        return post.id !== id;
                    })
                });
            }catch(e){
                if(e.response){
                    console.error('Error on delete Response: '+ e.response.data);
                }
            console.error('Error on delete: '+ e.response);
        }
    }
    

    render() {
        
        if (this.props.contentFetch){
            return <h1> Loading Posts!! </h1>
        }
        
        if (this.props.contentError) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
        
        return (
            <div className = "container">
            {this.props.userSuccess  && <h3> Hola {this.props.user.name}! </h3> }
            {this.props.user.rol==='ADMIN' && 
                <div>
                    <Link to = {`/new`}>
                        <button className = "btn btn-secondary "> Create New </button>
                    </Link>
                </div>
            }
            {this.state.posts.map(post => (
                <div className = "card row mt-4 " key={post.id}>

                    <div className = "card-header">
                        <div className="col-lg">
                            <h5> {post.title} </h5>
                        </div>

                        {this.props.user.rol==='ADMIN' && 
                            <div className="col-lg">
                                <Link to = {`/edit/${post.id}`}>
                                    <span className = "badge badge-info" onClick = {this.onClickEdit}> Edit </span>
                                </Link>
                                    <span className = "badge badge-danger" onClick = {() => this.handleDelete(post.id)}> Delete </span>
                            </div>
                        }
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
    user: state.login.user,
    userSuccess: state.login.user_success,
    content: state.app.content,
    contentError: state.app.content_error,
    contentFetch: state.app.content_fetch
});

const mapsDispatchToProps = dispatch => ({
        fetchContent: url => dispatch(fetchContent(url))
});

export default connect(mapStateToProps, mapsDispatchToProps) (Home);