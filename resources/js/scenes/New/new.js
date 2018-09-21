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
        this.setState(prevState => ({
          formData: {
              ...prevState.formData,
              [target.name]: target.value
          }}
          ), () => console.log(this.state.formData.description))
    }
    
    handleSubmit(){
        if((this.state.formData.title.length > 0) && (this.state.formData.description.length > 0)){
            axios.post(`/api/posts`, {
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
        return (
        <div className = "container">
            <div className = "card">

                    <div className = "row"> 
                    <h4>Creando un nuevo post:</h4>
                        <h5> Title </h5>
                        <input name = 'title' onChange = {(e) => this.handleInputChange(e.target)}/>                            
                    </div>
                    <div className = "row"> 
                        <h5> Description </h5>
                        <textarea name = 'description' onChange = {(e) => this.handleInputChange(e.target)}/>
                    </div>
                    <div className = "row"> 
                        <button name = "submit" onClick = {() => this.handleSubmit()} className = "btn btn-success btn-sm" >
                            Submit
                        </button>
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