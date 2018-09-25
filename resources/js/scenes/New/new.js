import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withAlert } from "react-alert";

class New extends Component {
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
        if(target.name === 'title') {
            if(target.value.length>255) return false;
        }

        this.setState({
            formData: {
            ...this.state.formData,
            [target.name]: target.value
            }
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        const data = this.state.formData;
        if (data.title.length < 1) {
            this.props.alert.error('The title is required.');
            return false
        }
        if(data.title.length>255) {
            this.props.aler.error('The max of caracters is 255 at the title')
            return false;
        }
        if (data.description.length < 1 ) {
            this.props.alert.error('The Description is required.');
            return false;
        }

        axios.post(`/api/posts`, {
            user_id: this.props.user.id,
            title: data.title,
            description: data.description,
            }).then(this.props.history.push('/')
        );
    }

    render() {
        return (
        <div className = "container">
            <div className = "card centered">
                <div className="card-body">
                    <div className="col-xl">
                        <form onSubmit = {(e) => this.handleSubmit(e)}>
                            <h4>Creando un nuevo post:</h4>
                            <label> Title </label>
                            <div>
                                <input className = 'form-control' name = 'title' value = {this.state.formData.title} onChange = {(e) => this.handleInputChange(e.target)}/>                            
                            </div>
                            <label> Description </label>
                            <div>
                                <textarea  className ='form-control' name = 'description' value = {this.state.formData.description} onChange = {(e) => this.handleInputChange(e.target)}/>
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

const mapStateToProps = state => ({
    user: state.login.user,
    userError: state.login.user_error,
    userLoad: state.login.user_load,
    userSuccess:  state.login.user_success,
  });
  
export default connect(mapStateToProps) (withAlert(New));