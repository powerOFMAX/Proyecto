import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchContent } from '../../actions/app';

class Edit extends Component {
  componentDidMount(){
      this.props.fetchContent(`/api/posts/${this.props.match.params.id}`);
  }


  render() {
    return (
        <div>
            <h4>
                Editando post numero: {this.props.match.params.id}
            </h4>
            <h5> Title </h5>
                <input/>
            <h5> Description </h5>
            <textarea setText={this.props.content.description}>
                asdasdsd
            </textarea>
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

export default connect(mapStateToProps, mapsDispatchToProps) (Edit);