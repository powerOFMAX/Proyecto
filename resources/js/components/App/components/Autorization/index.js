import { connect } from 'react-redux';
import React, { Component } from 'react';

export default function Authorization(WrappedComponent, allowedRoles){
    class WithAuthorization extends Component {
      constructor(props) {
        super(props);
        this.state = {
            user: []
          }
      }

      render() {
        const role = this.props.user.rol;
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

    return  connect (mapStateToProps) (WithAuthorization);
}

