import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from '../../actions/app';

class Edit extends Component {
    constructor(props){
        super(props);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
    }

  componentDidMount(){
      this.props.fetchContent(`/api/posts/${this.props.match.params.id}`);
  }

  onUpdateTitle(event){
      if(event){
        this.props.content.title = (event.target.value);  
      }
  }

  render() {
    if (this.props.content_fech){
        return <h1> Loading Post!! </h1>
    }

    if (this.props.content_error) {
        return <p>Sorry! There was an error loading the post</p>;
    }
    return (
        <div className = "container">
            <div className = "card">
                <h4>Editando post numero: {this.props.match.params.id}</h4>
                    <div>
                        <h5> Title </h5>
                        <input  onChange = {this.onUpdateTitle}/>                            
                    </div>
                    <div>
                        <h5> Description </h5>
                        <textarea/>
                    </div>
                    <button name = "submit" className = "btn btn-success" >
                        Submit
                    </button>

            </div>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
        content: state.app.content,
        content_error: state.app.content_error,
        content_fech: state.app.content_fetch
    };
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchContent: (url) => dispatch(fetchContent(url))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps) (Edit);