import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from '../../actions/app';
import axios from 'axios';

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                title: '',
                description: '',
            },
        }
    }

    handleInputChange (target) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [target.name]: target.value
            }}
            ), () => console.log(this.state.formData.description))
    }

  componentDidMount(){
      this.props.fetchContent(`/api/posts/${this.props.match.params.id}`);
  }

  onUpdateTitle(event){
      if(event){
        this.props.content.title = (event.target.value);  
      }
  }

  handleSubmit(e){
      e.preventDefault();
        if((this.state.formData.title.length > 0) && (this.state.formData.description.length > 0)){
            axios.put(`/api/posts/${this.props.match.params.id}`, {
                user_id: this.props.user.id,
                title: this.state.formData.title,
                description: this.state.formData.description,
            })
            .then(
                setTimeout(() => {
                    this.props.history.push('/')
                }, 2000)
            );
        }
    }

  render() {
    if (this.props.content_fetch){
        return <h1> Loading Post!! </h1>
    }

    if (this.props.content_error) {
        return <p>Sorry! There was an error loading the post</p>;
    }
    return (
        <div className = "container">
            <div className = "card">
            <form onSubmit = {(e) => this.handleSubmit(e)}>
                <h4>Editando post numero: {this.props.match.params.id}</h4>
                    <div>
                        <h5> Title </h5>
                        <input  name = 'title' onChange = {(e) => this.handleInputChange(e.target)}/>                            
                    </div>
                    <div>
                        <h5> Description </h5>
                        <textarea name = 'description' onChange = {(e) => this.handleInputChange(e.target)}/>
                    </div>
                    <button  name = "submit" className = "btn btn-success" >
                        Submit
                    </button>
            </form>
            </div>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
        content: state.app.content,
        content_error: state.app.content_error,
        content_fetch: state.app.content_fetch
    };
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchContent: (url) => dispatch(fetchContent(url))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps) (Edit);