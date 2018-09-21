import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions/login';

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
    this.setState(prevState => ({
      formData: {
          ...prevState.formData,
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

  loggedRefresh() {
    setTimeout(() => {
      this.props.history.push('/')
    }, 2000);
  }

  componentDidUpdate(){
    if(this.props.userSuccess){
      this.loggedRefresh();
    }
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
                  <div className="alert alert-warning" role="alert">
                      <strong>Warning!</strong> Make sure to fill properly all the fields!.
                  </div>
                }
              <div>
                <h3>Login</h3>
              </div>

              <form onSubmit = {(e) => this.handleSubmit(e)}>
                <div className="form-group centered">
                    <h5>Email</h5>
                    <input type= "email" name="email" className="form-control" placeholder="Email address" value={this.state.email} onChange= {(e) => this.handleInputChange(e.target)} required/>
                </div>
                <div className="form-group centered">  
                  <h5>Password</h5>
                  
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
const mapStateToProps = state => ({
  user: state.login.user,
  userError: state.login.user_error,
  userLoad: state.login.user_load,
  userSuccess:  state.login.user_success,
});

const mapsDispatchToProps = dispatch => ({
      login: (url,data) => dispatch(login(url,data))
});

export default connect (mapStateToProps, mapsDispatchToProps,) (Login);
