import { connect } from 'react-redux';
import React, { Component } from 'react';
import { logged } from '../../../../actions/login';

export default function Authorization(WrappedComponent, allowedRoles){
    class WithAuthorization extends Component {
      constructor(props) {
        super(props);
        this.state = {
            user: []
          }
      }

      componentDidMount(){
        this.props.logged(`/api/logged`);
      }

      render() {
        const role = this.props.user.rol;
        console.log(allowedRoles);
        console.log(role);
        if (allowedRoles.length === 0) return <WrappedComponent {...this.props} /> 
        if (allowedRoles.includes(role)) {
          return <WrappedComponent {...this.props} />
        } else {
          return <h1>Access Denied!</h1>
        }
      }
    }

    const mapStateToProps = state => ({
        user: state.login.user,
        userError: state.login.user_error,
        userLoad: state.login.user_load,
        userSuccess:  state.login.user_success,
    });
    const mapsDispatchToProps = dispatch => ({
        logged: (url) => dispatch(logged (url))
    });

    return  connect (mapStateToProps, mapsDispatchToProps) (WithAuthorization);
}

