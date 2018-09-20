import New from "../../../../scenes/New/new";
import { connect } from 'react-redux';
import React from 'react';


const Authorization = (WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidUpdate(prevProps,prevState){
    }

    render() {
      const role = this.props.user.rol;
      console.log(this.props);
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>No page for you!</h1>
      }
    }
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

export default connect (mapStateToProps, mapsDispatchToProps) (Authorization(New, ['ADMIN']));
