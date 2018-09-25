import { connect } from 'react-redux';
import React, { Component } from 'react';
import { me } from '../../../../actions/login';

export default function Authorization(WrappedComponent, allowedRoles){
  class WithAuthorization extends Component {
    constructor() {
      super();
      this.state = {
          user: []
        }
    }

    componentDidMount(){
      this.props.me(`/api/me`);
    }

    handleAccessDenied(){
        this.props.history.push('/');
    }

    render() {
      const role = this.props.user.rol;
      if (allowedRoles.length === 0) return <WrappedComponent {...this.props} /> 
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        this.handleAccessDenied()
        return <h1> Access Denied!</h1>
      }
    }
  }

  const mapStateToProps = (state) => ({
      user: state.login.user,
      userError: state.login.user_error,
      userLoad: state.login.user_load,
      userSuccess:  state.login.user_success,
  });
  const mapsDispatchToProps = (dispatch) => ({
      me: (url) => dispatch(me(url))
  });

  return connect (mapStateToProps, mapsDispatchToProps) (WithAuthorization);
}

