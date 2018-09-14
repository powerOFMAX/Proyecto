import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from "../../actions/postsActions";


class See extends Component {
    componentDidMount(){
        console.log(this.props);

        this.props.fetchData('http://127.0.0.1:8000/api/posts/1');
        console.log(this.props);
    }

    render() {
    return (
        <div>
            <h4>
                Viendo post numero: {this.props.match.params.id}
               
            </h4>
            <h5>Title</h5> 
                {this.props.posts.title}
            <p>
                {this.props.posts.description}
            </p>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
        posts: state.post,
        hasError: state.HaveError
    };    
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps) (See);