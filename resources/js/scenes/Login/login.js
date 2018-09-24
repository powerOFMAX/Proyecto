import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import { withAlert } from "react-alert";

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: [],
      formData: {
        email: '',
        password: '',
      }
    }
  }

  handleInputChange (target) {
    this.setState(({
      formData: {
        ...this.state.formData,
        [target.name]: target.value
      }}
      ))
    }
    
    handleSubmit(e){
      e.preventDefault();
      if((this.state.formData.email.length > 0) && (this.state.formData.password.length > 0)){
        this.props.login(`/api/login`,this.state.formData);
      }
    }

  componentDidUpdate(){
    if(this.props.user.length !== 0) this.props.history.push('/');
  }

  render() {
    return (
    <div className="container">
      <div className="card centered">
        <div className="card-body">
            <div className="col-xl">
                {this.props.userSuccess &&

                  <div className="alert alert-success" role="alert">
                  
                    <strong>Login Success!</strong> You'll be redirect to the home! .
                  </div>
                }
                {this.props.userError &&
                  <div className="alert alert-danger" role="alert">
                      <strong>Error!</strong> Login Fail, make sure to put the correct user!.
                  </div>
                }
              <div>
                <h3>Login</h3>
              </div>

              <form onSubmit = {(e) => this.handleSubmit(e)}>
                <div className="form-group centered">
                    <label>Email</label>
                    <input type= "email" name="email" className="form-control" placeholder="Email address" value={this.state.email} onChange= {(e) => this.handleInputChange(e.target)} required/>
                </div>
                <div className="form-group centered">  
                  <label>Password</label>
                  
                  <input type="password" name="password" className="form-control" placeholder="password" value= {this.state.password} onChange = {(e) => this.handleInputChange(e.target)}  required/>
                </div>
                <div className="form-group centered">
                    <button className = "btn btn-success" > Login in </button>
                </div>

              </form>
            </div>
        </div>
      </div>
    </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.login.user,
  userError: state.login.user_error,
  userLoad: state.login.user_load,
  userSuccess:  state.login.user_success,
});

const mapsDispatchToProps = (dispatch) => ({
      login: (url, data) => dispatch(login(url, data))
});

export default connect (mapStateToProps, mapsDispatchToProps,) (withAlert(Login));
