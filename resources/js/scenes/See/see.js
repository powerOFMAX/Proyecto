import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from "../../actions/postsActions";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class See extends Component {

  
    render() {
    return (
        <div>
            <h4>
                Viendo post numero: {this.props.match.params.id}
                {console.log(this.props)}
            </h4>
            <h5>Title</h5> 
            {this.props.posts[this.props.match.params.id].title}
            <p>
                {this.props.posts[this.props.match.params.id].description}
            </p>

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

export default connect(mapStateToProps) (See);