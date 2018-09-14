import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from "../../actions/postsActions";


class See extends Component {
    componentDidMount(){
        console.log(this.props.match.params.id);
    }

    render() {
    return (
        <div>
            <h4>
                Viendo post numero: {this.props.match.params.id}
               
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

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps) (See);