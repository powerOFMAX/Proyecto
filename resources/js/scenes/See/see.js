import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from "../../actions/app";


class See extends Component {
    componentDidMount(){
        this.props.fetchContent(`/api/posts/${this.props.match.params.id}`);
    }

    render() {
    return (
        <div>
            <h4>
                Viendo post numero: {this.props.match.params.id}
            </h4>
            <h5>Title</h5> 
                {this.props.content.title}
            <p>
                {this.props.content.description}
            </p>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
        content: state.app.content
};
}

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchContent: (url) => dispatch(fetchContent(url))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps) (See);