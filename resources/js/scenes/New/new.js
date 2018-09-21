import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class New extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            formData: []
        }
    }

    componentDidMount(){
        
    }

    handleSubmit(){
        if((this.state.formData.title.length > 0) && (this.state.formData.description.length > 0)){
            axios.post(`/api/posts`);

        }
    }

    render() {
        return (
        <div className = "container">
            <div className = "card">
                <div className = "card-body">

                    <div className = "row"> 
                    <h4>Creando un nuevo post:</h4>
                        <h5> Title </h5>
                        <input  onChange = {this.onUpdateTitle}/>                            
                    </div>
                    <div className = "row"> 
                        <h5> Description </h5>
                        <textarea/>
                    </div>
                    <div className = "row"> 
                        <button name = "submit" onClick={() => this.handleSubmit()} className = "btn btn-success btn-sm" >
                            Submit
                        </button>
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