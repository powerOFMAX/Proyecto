import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from '../../../../actions/login';
import { withAlert } from "react-alert";


class NavBar extends Component {
    constructor (props){
        super(props);
    }

    handleLogout(){
        this.props.logout(`/api/logout`);
        this.props.alert.success('Logout success!')
    }

   render() {
    return (
        <div className = "navbar" id='header'>
            <Link to = "/" > Home </Link>
            {this.props.userSuccess ? (
            <a href="javascript:;" dusk="logout-link" onClick={() => this.handleLogout()}> Logout </a>
            ) : (
            <Link to = "/login" dusk="login-link"> Login In </Link> 
            )}
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
    logout: (url) => dispatch(logout(url))
});

export default connect (mapStateToProps, mapsDispatchToProps) (withAlert(NavBar));
      