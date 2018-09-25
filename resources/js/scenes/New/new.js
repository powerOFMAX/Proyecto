import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
        this.setState({
          formData: {
            ...this.state.formData,
            [target.name]: target.value
          }
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        if((this.state.formData.title.length > 0) && (this.state.formData.description.length > 0)){
            axios.post(`/api/posts`, {
                user_id: this.props.user.id,
                title: this.state.formData.title,
                description: this.state.formData.description,
            })
                .then(this.props.history.push('/'));
        }
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
                                <input className = 'form-control' name = 'title' onChange = {(e) => this.handleInputChange(e.target)}/>                            
                            </div>
                            <label> Description </label>
                            <div>
                                <textarea  className ='form-control' name = 'description' onChange = {(e) => this.handleInputChange(e.target)}/>
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
  
export default connect(mapStateToProps) (New);