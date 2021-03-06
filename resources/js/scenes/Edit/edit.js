import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from '../../actions/app';
import axios from 'axios';
import { withAlert } from "react-alert";
import PropTypes from "prop-types";

class Edit extends Component {
    static defaultProps = {
        content: [],
        contentError: false,
        contentFetch: false
    };

    static propTypes = {
        content: PropTypes.array.isRequired,
        contentError: PropTypes.bool,
        contentFetch: PropTypes.bool
    };

    constructor(props){
        super(props);
        this.state = {
            formData: {
                title: '',
                description: '',
            }
        }
    }
    
    handleInputChange (target) {
        this.setState({
            formData: {
                ...this.state.formData,
                [target.name]: target.value
            }
        })
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

    async handleSubmit(e){
        e.preventDefault();
        const data= this.state.formData;
        if (data.title.length < 1) {
            this.props.alert.error('The title is required.');
            return false;
        }
        if(data.title.length > 255) {
            this.props.alert.error('The max of caracters is 255 at the title');
            return false;
        }
        if (data.description.length < 1 ) {
            this.props.alert.error('The Description is required.');
            return false;
        }
        try {
            await axios.put(`/api/posts/${this.props.match.params.id}`, {
                user_id: this.props.user.id,
                title: data.title,
                description: data.description,
                });
            this.props.history.push('/');
        } catch (e) {
            if(e.response){
                console.error('Error on Edit Response' + e.response.data);
            }
                console.error('Error on Edit' + e.message);
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
                            <form dusk="form"  onSubmit = {(e) => this.handleSubmit(e)}>
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

const mapStateToProps = (state) => ({
    content: state.app.content,
    contentError: state.app.content_error,
    contentFetch: state.app.content_fetch
});

const mapsDispatchToProps = (dispatch) => ({
    fetchContent: (url) => dispatch(fetchContent(url))
});

export default connect(mapStateToProps, mapsDispatchToProps) (withAlert(Edit));