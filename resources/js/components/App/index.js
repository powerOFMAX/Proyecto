import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../../rootReducers';

import { composeWithDevTools } from 'redux-devtools-extension';

import Main  from '../App/components/Main';
import NavBar from '../App/components/Nav';

import { BrowserRouter as Router } from 'react-router-dom';

//instalando el redux-devtools-extension
const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
);

function configureStore(initialState = {}) {
    return createStore(
        rootReducers,
        initialState,
        enhancer
    );
}

const store = configureStore();

const App = () => (
    <div>
        <NavBar/>
        <Main/>
    </div>
);

render(
    <Provider store = {store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app') 
);
