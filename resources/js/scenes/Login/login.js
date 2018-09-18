import React, { Component } from 'react'
import styled from 'styled-components';


export default class Login extends Component {
  render() {
    return (   
    <div className="container">
      <div className="card">
        <div className="card-body row text-center">
            <div className="col-md-offset-5 col-md-3">
              <h3>Login</h3>
                <div className="form-group">
                    <h5>Email</h5>
                    <input type="email" className="form-control" placeholder="Email address" required/>
                </div>

                <div className="form-group">
                  <h5>Password</h5>
                  <input type="password" className="form-control" placeholder="password" required/>
                </div>

                <div className="form-group">
                    <button className = "btn btn-success"> Login in </button>
                </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}

