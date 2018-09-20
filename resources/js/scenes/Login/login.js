import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions/login';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: [],
      email: '',
      password: '',
      isLoading:false,
      logged: false,
    }
  }

  handlePassword (value) {
    this.setState({
      password: value
    });
  }

  handleEmail(value){
    this.setState({
      email: value
    });
  }

  handleSubmit(e){
    if((this.state.email.length > 0) && (this.state.password.length > 0)){
      this.setState({
        isLoading: true      
      });
     //login
      this.props.login(`/api/login`,this.state);
      this.ejemplo();
    }
  }

  ejemplo() {
    setTimeout(() => {
      alert('Login success')
      this.props.history.push('/')
    }, 1000);
  }

  componentDidUpdate(prevProps,prevState){
    if(this.props.user.length !== prevProps.user.length){
      this.setUser();
    }
  }

  setUser(){
    this.setState({
      user: this.props.user,
      isLoading: false,
      logged: true,
    });
  }

  render() {
    return (
    <div className="container">
      <div className="card loginContent">
        <div className="card-body">
            <div className="col-lg ">
              <div>
                <h3>Login</h3>
              </div>
              <div className="form-group loginContent">
                  <h5>Email</h5>
                  <input type= "email" className="form-control" placeholder="Email address" value={this.state.email} onChange= {(e) => this.handleEmail(e.target.value)} required/>
              </div>
              <div className="form-group loginContent">  
                <h5>Password</h5>
                <input type="password" className="form-control" placeholder="password" value= {this.state.password} onChange = {(e) => this.handlePassword(e.target.value)}  required/>
              </div>
              <div className="form-group loginContent">
                  <button className = "btn btn-success" disable={this.state.isLoading.toString()} onClick = {() => this.handleSubmit()}> Login in </button>
              </div>
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

const mapsDispatchToProps = dispatch => {
  return {
      login: (url,data) => dispatch(login(url,data))
  };
};

export default connect (mapStateToProps, mapsDispatchToProps,) (Login);
