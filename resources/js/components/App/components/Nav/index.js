import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class NavBar extends Component {
    constructor (props){
        super(props);
    }

   render() {
    return (
      <div className = "navbar">
                <Link to = "/"> Home </Link>
                {this.props.userSuccess ? (
                <Link to = "/logout"> Log out </Link> 
                ) : (
                <Link to = "/login"> Login In </Link> 
                )}
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

export default connect (mapStateToProps) (NavBar);
      