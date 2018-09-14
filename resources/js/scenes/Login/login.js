import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (   
    <div>
      <div>
        <h3>Email:</h3>
          <input/>
      </div>
      <div>
          <h3>Password</h3>
          <input/>
      </div>
          <button className="btn btn-success">Login in</button>
    </div>
    );
  }
}

