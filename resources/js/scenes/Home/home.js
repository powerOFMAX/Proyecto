import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContent } from "../../actions/app";
import axios from 'axios';
import PropTypes from "prop-types";

class Home extends Component {
    static defaultProps = {
        user: [],
        userSuccess: false,
        content: [],
        contentError: false,
        contentFetch: false
    };
    static propTypes = {
        user: PropTypes.array.isRequired,
        userSuccess:  PropTypes.bool,
        content: PropTypes.array,
        contentError: PropTypes.bool,
        contentFetch: PropTypes.bool
    };

    constructor(props){
        super(props);
        this.state = {
            user: [],
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
    
    loadMore(e){
        e.preventDefault();
        this.props.fetchContent(`${this.props.nextPageUrl}`);
    }

    loadPrevius(e){
        e.preventDefault();
        this.props.fetchContent(`${this.props.prevPageUrl}`);
    }

    setPost(){
        this.setState({
            posts: this.props.content
        })
    }
    
    async handleDelete(id){
        if(!confirm(`Do you want to delete post ${id} ?`)) return false;
        try {
            await axios.delete(`/api/posts/${id}`);
            let posts = this.state.posts.filter(post => post.id !== id);
            this.setState({posts})
        }catch (e) {
            if(e.response){
                console.error('Error on delete Response: '+ e.response.data);
            }
                console.error('Error on delete' + e.message);
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
                <h1>
                    MyBlog
                </h1>
                {this.props.userSuccess  && <h3> Hola {this.props.user.name}! </h3> }
                {this.props.user.rol==='ADMIN' && 
                    <div>
                        <Link to = {`/new`} className = "btn btn-secondary ">
                            Create New
                        </Link>
                    </div> 
                }
                
                {this.state.posts.map(post => (
                    <div className = "card row mt-4 " key={post.id}>

                        <div className = "card-header">
                            <div className="col-lg">
                                <h5> {post.title} </h5>
                            </div>

                            {this.props.user.rol === 'ADMIN' && 
                                <div className="col-lg">
                                    <Link to = {`/edit/${post.id}`} className = "badge badge-info" dusk = {`edit-${post.id}`}>
                                        Edit
                                    </Link>
                                    <a href = "javascript:;" className = "badge badge-danger" dusk = {`delete-${post.id}`} onClick = {() => this.handleDelete(post.id)}> Delete </a>
                                </div>
                            }
                        </div>

                        <div className = "card-body">
                            <p className = "card-text">{post.description.substring(0,100)}...</p>
                            <Link to = {`/posts/${post.id}`} className = "btn btn-primary">
                                See more...
                            </Link>
                        </div>
                    </div>
                ))}

                       
                <nav>
                    <ul className="pagination">
                        {this.props.currentPage === 1 ? (
                            <li className = "page-item disabled"><a className = "page-link" href="#" onClick = {(e) => this.loadPrevius(e)}>Previous</a></li>
                        ):(
                            <li className = "page-item"><a className="page-link" href="#" onClick = {(e) => this.loadPrevius(e)}>Previous</a></li>
                        )}
                        
                        {this.props.currentPage ===  this.props.lastPage ? (
                            <li className = "page-item disabled"><a className = "page-link" href="#" onClick = {(e) => this.loadMore(e)}>Next</a></li>
                        ):(
                            <li className = "page-item"><a className = "page-link" href="#" onClick = {(e) => this.loadMore(e)}>Next</a></li>
                        )} 
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    userSuccess: state.login.user_success,
    content: state.app.content.data,
    contentError: state.app.content_error,
    contentFetch: state.app.content_fetch,
    currentPage: state.app.content.current_page,
    lastPage: state.app.content.last_page,
    nextPageUrl: state.app.content.next_page_url,
    prevPageUrl: state.app.content.prev_page_url,
});

const mapsDispatchToProps = (dispatch) => ({
    fetchContent: url => dispatch(fetchContent(url))
});

export default connect(mapStateToProps, mapsDispatchToProps) (Home);