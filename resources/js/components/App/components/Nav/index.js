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
        <div className = "navbar">
            <Link to = "/"> Home </Link>
            {this.props.user.length !== 0 ? (
            <Link to = "/login" onClick={() => this.handleLogout()}> Logout </Link>
            ) : (
            <Link to = "/login"> Login In </Link> 
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
      