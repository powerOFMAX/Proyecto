import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/data';

import Index from '../../scenes/Home/index';
import NavBar from '../../components/App/navbar';
import Main from '../../components/App/main';

import { BrowserRouter as Router } from 'react-router-dom';

function configureStore(initialState) {

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}

const store = configureStore();

const Aplication = () => (
    <div>
        <NavBar/>,
        <Main/>
    </div>
);


render(
    <Provider store = {store}>
        <Router>
            <Index/>
        </Router>
    </Provider>,
    document.getElementById('app') 
);
