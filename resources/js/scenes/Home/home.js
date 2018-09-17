import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchContent } from "../../actions/content";


class Home extends Component {
    componentDidMount(){
        this.props.fetchContent('/api/posts/');
    }
    
    onClickSeeMore(){
        console.log('veo mas');
    }
    
    onClickEdit(){
        console.log('edito');
    }
    
    onClickDelete(id){
        console.log(this.props);
        let success = confirm(`Do you want to delete post ${id} ?`);

        if(success){
            console.log('asdasdasd');
        }

    }

    render() {
        if (this.props.contentError) {
            return <p>Sorry! There was an error loading the posts</p>;
        }
            return (
                <div className = "container">
                {this.props.content.map(post => (
                    <div className = "card col-lg mt-4" key={post.id}>
                        <div className = "card-body">
                            <h5 className = "card-header">
                            {post.title}
                                <Link to = {'/edit/'+post.id}>
                                    <span className = "badge" onClick = {this.onClickEdit}> Edit </span>
                                </Link>
                                    <span className = "badge" onClick = {(id) => this.onClickDelete(post.id)}> Delete </span>
                            </h5>
                            <p className = "card-text">{post.description.substring(0,100)}...</p>
                            <Link to = {'/post/'+post.id}>
                                <button className = "btn btn-primary" onClick = {this.onClickSeeMore}> See more... </button>
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
        content: state.content,
        contentError: state.contentError
    };    
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchContent: (url) => dispatch(fetchContent(url))
    };
};


export default connect(mapStateToProps, mapsDispatchToProps) (Home);