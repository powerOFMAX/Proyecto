import { connect } from 'react-redux';
import React, { Component } from 'react';
import { me } from '../../../../actions/login';
import PropTypes from "prop-types";

export default function Authorization(WrappedComponent, allowedRoles){
  class WithAuthorization extends Component {
    static defaultProps = {
      user: []
    };
    static propTypes = {
      user: PropTypes.array.isRequired,
    };


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
        this.handleAccessDenied();
        return <h1> Access Denied!</h1>
      }
    }
  }

  const mapStateToProps = (state) => ({
      user: state.login.user
  });
  const mapsDispatchToProps = (dispatch) => ({
      me: (url) => dispatch(me(url))
  });

  return connect (mapStateToProps, mapsDispatchToProps) (WithAuthorization);
}

