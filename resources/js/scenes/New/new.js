import React, { Component } from 'react';

export default class New extends Component {
    componentDidMount(){
    }

    render() {
        return (
            <div className = "container">
            <div className = "card">
                <h4>Creando un nuevo post:</h4>
                    <div>
                        <h5> Title </h5>
                        <input  onChange = {this.onUpdateTitle}/>                            
                    </div>
                    <div>
                        <h5> Description </h5>
                        <textarea/>
                    </div>
                    <button name = "submit" className = "btn btn-success" >
                        Submit
                    </button>

            </div>
        </div>
        );
  }

}
