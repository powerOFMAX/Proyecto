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
      invalidKeys: false
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

  async handleSubmit(e){
    if((this.state.email.length > 0) && (this.state.password.length > 0)){
      this.setState({
        isLoading: true      
      });
      try{
        const response = await this.props.login(`/api/login`,this.state);
        this.setState({
          logged:true,
          isLoading:false,
          invalidKeys: false
        });
        this.loggedRefresh();
      }catch(e) {
        if(e.response){
          console.error('Error in Submit Response: '+ e.response.data);
        }
          console.error('Error in Submit: '+ e);
      }
    }else{
      this.setState({
        isLoading:false,
        invalidKeys: true
      });
    }
  }

  loggedRefresh() {
    setTimeout(() => {
      this.props.history.push('/')
    }, 2000);
  }

  componentDidUpdate(prevProps){
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
            <div className="col-xl">
                {this.state.logged &&
                  <div className="alert alert-success" role="alert">
                    <strong>Login Success!</strong> You'll be redirect to the home! .
                  </div>
                }
                {this.state.invalidKeys &&
                  <div className="alert alert-warning" role="alert">
                      <strong>Warning!</strong> Make sure to fill properly all the fields!.
                  </div>
                }
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
