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
        this.setState({
            formData: {
                ...this.state.formData,
                [target.name]: target.value
            }}
            ), () => console.log(this.state.formData.description)
    }
        
    componentDidMount(){
        this.props.fetchContent(`/api/posts/${this.props.match.params.id}`);
    }
    
    componentDidUpdate(prevProps){
        if(this.props.content.length >0 && (prevProps.content.length !== this.props.content.length)){
            this.refreshState();
        }
    }

    refreshState(){
        this.setState({
            formData: {
                title: this.props.content[0].title,
                description: this.props.content[0].description
            }
        });
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
    if (this.props.contentFetch){
        return <h1> Loading Post!! </h1>
    }

    if (this.props.contentError) {
        return <p>Sorry! There was an error loading the post</p>;
    }
    return (
        <div className = "container">
            <div className = "card centered">
                <div className="card-body">
                    <div className="col-xl">
                        <form onSubmit = {(e) => this.handleSubmit(e)}>
                            <h4>Editando post numero: {this.props.match.params.id}</h4>
                            <label> Title </label>
                            <div>
                                <input className ='form-control' value = {this.state.formData.title} name = 'title' onChange = {(e) => this.handleInputChange(e.target)}/>                            
                            </div>
                            <label> Description </label>
                            <div>
                                <textarea  className ='form-control' value = {this.state.formData.description } name = 'description' onChange = {(e) => this.handleInputChange(e.target)}/>
                            </div>
                            <button name = "submit" className = "btn btn-success btn-sm" >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        content: state.app.content,
        contentError: state.app.content_error,
        contentFetch: state.app.content_fetch
    };
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchContent: (url) => dispatch(fetchContent(url))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps) (Edit);